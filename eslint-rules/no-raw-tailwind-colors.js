/**
 * ESLint rule: no-raw-tailwind-colors
 *
 * Disallows raw Tailwind color utilities (e.g., text-slate-600, bg-gray-100)
 * in favor of design system tokens (e.g., text-foreground, bg-background).
 *
 * This ensures components use the defined color palette and prevents
 * accidental introduction of colors that don't work with the dark theme.
 */

// Color scales to disallow (Tailwind's default palette)
const DISALLOWED_COLOR_SCALES = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

// Tailwind utility prefixes that use colors
const COLOR_PREFIXES = [
  "text",
  "bg",
  "border",
  "ring",
  "outline",
  "divide",
  "from",
  "via",
  "to",
  "fill",
  "stroke",
  "decoration",
  "accent",
  "caret",
  "shadow", // shadow-red-500 etc
  "placeholder",
];

// Build regex pattern: (text|bg|...)-(?:hover:|focus:|...)?(slate|gray|...)-\d+
// Also catches variants like hover:text-slate-600, dark:bg-gray-100
const colorPattern = new RegExp(
  `(?:^|\\s|:)(${COLOR_PREFIXES.join("|")})-(?:[a-z]+:)*(${DISALLOWED_COLOR_SCALES.join("|")})-\\d{2,3}(?:\\s|$|"|')`,
  "g",
);

// Allowed exceptions (add patterns here if some raw colors are intentional)
const ALLOWED_PATTERNS = [
  // Example: /shiki|prism|hljs/ for syntax highlighting themes
];

const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow raw Tailwind color utilities; use design system tokens instead",
      category: "Design System",
      recommended: true,
    },
    messages: {
      noRawColor:
        'Avoid raw Tailwind color "{{match}}". Use design system tokens instead (e.g., text-foreground, bg-background, border-accent-subtle).',
    },
    schema: [], // no options
  },

  create(context) {
    /**
     * Check a string value for raw color utilities
     */
    function checkForRawColors(node, value) {
      if (typeof value !== "string") return;

      // Skip if matches an allowed pattern
      if (ALLOWED_PATTERNS.some((pattern) => pattern.test(value))) return;

      // Reset regex state
      colorPattern.lastIndex = 0;

      let match;
      while ((match = colorPattern.exec(value)) !== null) {
        const rawMatch = match[0].trim();
        context.report({
          node,
          messageId: "noRawColor",
          data: { match: rawMatch },
        });
      }
    }

    return {
      // Check className="..." and class="..."
      JSXAttribute(node) {
        if (node.name.name !== "className" && node.name.name !== "class") {
          return;
        }

        // String literal: className="text-slate-600"
        if (node.value && node.value.type === "Literal") {
          checkForRawColors(node, node.value.value);
        }

        // Template literal: className={`text-slate-600`}
        if (node.value && node.value.type === "JSXExpressionContainer") {
          const expr = node.value.expression;

          // Direct string in expression: className={"text-slate-600"}
          if (expr.type === "Literal") {
            checkForRawColors(node, expr.value);
          }

          // Template literal: className={`px-4 ${condition ? "text-slate-600" : ""}`}
          if (expr.type === "TemplateLiteral") {
            expr.quasis.forEach((quasi) => {
              checkForRawColors(node, quasi.value.raw);
            });
          }
        }
      },

      // Check cn(), clsx(), classNames() function calls
      CallExpression(node) {
        const callee = node.callee;
        const funcName = callee.name || (callee.property && callee.property.name);

        // Common class name utility functions
        if (!["cn", "clsx", "classNames", "twMerge", "cva"].includes(funcName)) {
          return;
        }

        node.arguments.forEach((arg) => {
          if (arg.type === "Literal" && typeof arg.value === "string") {
            checkForRawColors(arg, arg.value);
          }

          if (arg.type === "TemplateLiteral") {
            arg.quasis.forEach((quasi) => {
              checkForRawColors(arg, quasi.value.raw);
            });
          }
        });
      },
    };
  },
};

export default rule;
