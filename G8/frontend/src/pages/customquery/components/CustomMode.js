// import "ace-builds/src-noconflict/mode-java";

// export class CustomHighlightRules extends window.ace.acequire(
//   "ace/mode/text_highlight_rules"
// ).TextHighlightRules {
//   constructor() {
//     super();
//     this.$rules = {
//       start: [
//         {
//           token: "comment",
//           regex: "#.*$",
//         },
//         {
//           token: "string",
//           regex: '".*?"',
//         },
//         {
//           include: "#module-member",
//         },
//       ],
//       "#id-character": [
//         {
//           token: "text",
//           regex: /[0-9A-Za-z_]/,
//         },
//       ],
//       "#end-of-id": [
//         {
//           token: "text",
//           regex: /(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#simple-id": [
//         {
//           token: "text",
//           regex: /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#lower-id": [
//         {
//           token: "text",
//           regex: /\b[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#upper-id": [
//         {
//           token: "text",
//           regex: /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#at-lower-id": [
//         {
//           token: "text",
//           regex: /@[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#comment-start": [
//         {
//           token: "text",
//           regex: /\/\/|\/\*/,
//         },
//       ],
//       "#non-context-sensitive": [
//         {
//           include: "#comment",
//         },
//         {
//           include: "#literal",
//         },
//         {
//           include: "#operator-or-punctuation",
//         },
//         {
//           include: "#keyword",
//         },
//       ],
//       "#relational-operator": [
//         {
//           token: "keyword.operator.relational.ql",
//           regex: /<=|<|>=|>/,
//         },
//       ],
//       "#comparison-operator": [
//         {
//           token: "keyword.operator.comparison.ql",
//           regex: /=|!-/,
//         },
//       ],
//       "#arithmetic-operator": [
//         {
//           token: "keyword.operator.arithmetic.ql",
//           regex: /\+|-|\*|\/|%/,
//         },
//       ],
//       "#comma": [
//         {
//           token: "punctuation.separator.comma.ql",
//           regex: /,/,
//         },
//       ],
//       "#semicolon": [
//         {
//           token: "punctuation.separator.statement.ql",
//           regex: /;/,
//         },
//       ],
//       "#dot": [
//         {
//           token: "punctuation.accessor.ql",
//           regex: /\./,
//         },
//       ],
//       "#dotdot": [
//         {
//           token: "punctuation.operator.range.ql",
//           regex: /\.\./,
//         },
//       ],
//       "#pipe": [
//         {
//           token: "punctuation.separator.pipe.ql",
//           regex: /\|/,
//         },
//       ],
//       "#open-paren": [
//         {
//           token: "punctuation.parenthesis.open.ql",
//           regex: /\(/,
//         },
//       ],
//       "#close-paren": [
//         {
//           token: "punctuation.parenthesis.close.ql",
//           regex: /\)/,
//         },
//       ],
//       "#open-brace": [
//         {
//           token: "punctuation.curlybrace.open.ql",
//           regex: /\{/,
//         },
//       ],
//       "#close-brace": [
//         {
//           token: "punctuation.curlybrace.close.ql",
//           regex: /\}/,
//         },
//       ],
//       "#open-bracket": [
//         {
//           token: "punctuation.squarebracket.open.ql",
//           regex: /\[/,
//         },
//       ],
//       "#close-bracket": [
//         {
//           token: "punctuation.squarebracket.close.ql",
//           regex: /\]/,
//         },
//       ],
//       "#operator-or-punctuation": [
//         {
//           include: "#relational-operator",
//         },
//         {
//           include: "#comparison-operator",
//         },
//         {
//           include: "#arithmetic-operator",
//         },
//         {
//           include: "#comma",
//         },
//         {
//           include: "#semicolon",
//         },
//         {
//           include: "#dot",
//         },
//         {
//           include: "#dotdot",
//         },
//         {
//           include: "#pipe",
//         },
//         {
//           include: "#open-paren",
//         },
//         {
//           include: "#close-paren",
//         },
//         {
//           include: "#open-brace",
//         },
//         {
//           include: "#close-brace",
//         },
//         {
//           include: "#open-bracket",
//         },
//         {
//           include: "#close-bracket",
//         },
//       ],
//       "#dont-care": [
//         {
//           token: "variable.language.dont-care.ql",
//           regex: /\b_(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#and": [
//         {
//           token: "keyword.other.and.ql",
//           regex: /\band(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#any": [
//         {
//           token: "keyword.quantifier.any.ql",
//           regex: /\bany(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#as": [
//         {
//           token: "keyword.other.as.ql",
//           regex: /\bas(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#asc": [
//         {
//           token: "keyword.order.asc.ql",
//           regex: /\basc(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#avg": [
//         {
//           token: "keyword.aggregate.avg.ql",
//           regex: /\bavg(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#boolean": [
//         {
//           token: "keyword.type.boolean.ql",
//           regex: /\bboolean(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#by": [
//         {
//           token: "keyword.order.by.ql",
//           regex: /\bby(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#class": [
//         {
//           token: "keyword.other.class.ql",
//           regex: /\bclass(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#concat": [
//         {
//           token: "keyword.aggregate.concat.ql",
//           regex: /\bconcat(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#count": [
//         {
//           token: "keyword.aggregate.count.ql",
//           regex: /\bcount(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#date": [
//         {
//           token: "keyword.type.date.ql",
//           regex: /\bdate(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#desc": [
//         {
//           token: "keyword.order.desc.ql",
//           regex: /\bdesc(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#else": [
//         {
//           token: "keyword.other.else.ql",
//           regex: /\belse(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#exists": [
//         {
//           token: "keyword.quantifier.exists.ql",
//           regex: /\bexists(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#extends": [
//         {
//           token: "keyword.other.extends.ql",
//           regex: /\bextends(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#false": [
//         {
//           token: "constant.language.boolean.false.ql",
//           regex: /\bfalse(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#float": [
//         {
//           token: "keyword.type.float.ql",
//           regex: /\bfloat(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#forall": [
//         {
//           token: "keyword.quantifier.forall.ql",
//           regex: /\bforall(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#forex": [
//         {
//           token: "keyword.quantifier.forex.ql",
//           regex: /\bforex(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#from": [
//         {
//           token: "keyword.other.from.ql",
//           regex: /\bfrom(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#if": [
//         {
//           token: "keyword.other.if.ql",
//           regex: /\bif(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#implies": [
//         {
//           token: "keyword.other.implies.ql",
//           regex: /\bimplies(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#import": [
//         {
//           token: "keyword.other.import.ql",
//           regex: /\bimport(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#in": [
//         {
//           token: "keyword.other.in.ql",
//           regex: /\bin(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#instanceof": [
//         {
//           token: "keyword.other.instanceof.ql",
//           regex: /\binstanceof(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#int": [
//         {
//           token: "keyword.type.int.ql",
//           regex: /\bint(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#max": [
//         {
//           token: "keyword.aggregate.max.ql",
//           regex: /\bmax(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#min": [
//         {
//           token: "keyword.aggregate.min.ql",
//           regex: /\bmin(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#module": [
//         {
//           token: "keyword.other.module.ql",
//           regex: /\bmodule(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#newtype": [
//         {
//           token: "keyword.other.newtype.ql",
//           regex: /\bnewtype(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#none": [
//         {
//           token: "keyword.quantifier.none.ql",
//           regex: /\bnone(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#not": [
//         {
//           token: "keyword.other.not.ql",
//           regex: /\bnot(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#or": [
//         {
//           token: "keyword.other.or.ql",
//           regex: /\bor(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#order": [
//         {
//           token: "keyword.order.order.ql",
//           regex: /\border(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#predicate": [
//         {
//           token: "keyword.other.predicate.ql",
//           regex: /\bpredicate(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#rank": [
//         {
//           token: "keyword.aggregate.rank.ql",
//           regex: /\brank(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#result": [
//         {
//           token: "variable.language.result.ql",
//           regex: /\bresult(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#select": [
//         {
//           token: "keyword.query.select.ql",
//           regex: /\bselect(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#strictconcat": [
//         {
//           token: "keyword.aggregate.strictconcat.ql",
//           regex: /\bstrictconcat(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#strictcount": [
//         {
//           token: "keyword.aggregate.strictcount.ql",
//           regex: /\bstrictcount(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#strictsum": [
//         {
//           token: "keyword.aggregate.strictsum.ql",
//           regex: /\bstrictsum(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#string": [
//         {
//           token: "keyword.type.string.ql",
//           regex: /\bstring(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#sum": [
//         {
//           token: "keyword.aggregate.sum.ql",
//           regex: /\bsum(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#super": [
//         {
//           token: "variable.language.super.ql",
//           regex: /\bsuper(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#then": [
//         {
//           token: "keyword.other.then.ql",
//           regex: /\bthen(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#this": [
//         {
//           token: "variable.language.this.ql",
//           regex: /\bthis(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#true": [
//         {
//           token: "constant.language.boolean.true.ql",
//           regex: /\btrue(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#where": [
//         {
//           token: "keyword.query.where.ql",
//           regex: /\bwhere(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#keyword": [
//         {
//           include: "#dont-care",
//         },
//         {
//           include: "#and",
//         },
//         {
//           include: "#any",
//         },
//         {
//           include: "#as",
//         },
//         {
//           include: "#asc",
//         },
//         {
//           include: "#avg",
//         },
//         {
//           include: "#boolean",
//         },
//         {
//           include: "#by",
//         },
//         {
//           include: "#class",
//         },
//         {
//           include: "#concat",
//         },
//         {
//           include: "#count",
//         },
//         {
//           include: "#date",
//         },
//         {
//           include: "#desc",
//         },
//         {
//           include: "#else",
//         },
//         {
//           include: "#exists",
//         },
//         {
//           include: "#extends",
//         },
//         {
//           include: "#false",
//         },
//         {
//           include: "#float",
//         },
//         {
//           include: "#forall",
//         },
//         {
//           include: "#forex",
//         },
//         {
//           include: "#from",
//         },
//         {
//           include: "#if",
//         },
//         {
//           include: "#implies",
//         },
//         {
//           include: "#import",
//         },
//         {
//           include: "#in",
//         },
//         {
//           include: "#instanceof",
//         },
//         {
//           include: "#int",
//         },
//         {
//           include: "#max",
//         },
//         {
//           include: "#min",
//         },
//         {
//           include: "#module",
//         },
//         {
//           include: "#newtype",
//         },
//         {
//           include: "#none",
//         },
//         {
//           include: "#not",
//         },
//         {
//           include: "#or",
//         },
//         {
//           include: "#order",
//         },
//         {
//           include: "#predicate",
//         },
//         {
//           include: "#rank",
//         },
//         {
//           include: "#result",
//         },
//         {
//           include: "#select",
//         },
//         {
//           include: "#strictconcat",
//         },
//         {
//           include: "#strictcount",
//         },
//         {
//           include: "#strictsum",
//         },
//         {
//           include: "#string",
//         },
//         {
//           include: "#sum",
//         },
//         {
//           include: "#super",
//         },
//         {
//           include: "#then",
//         },
//         {
//           include: "#this",
//         },
//         {
//           include: "#true",
//         },
//         {
//           include: "#where",
//         },
//       ],
//       "#predicate-start-keyword": [
//         {
//           include: "#boolean",
//         },
//         {
//           include: "#date",
//         },
//         {
//           include: "#float",
//         },
//         {
//           include: "#int",
//         },
//         {
//           include: "#predicate",
//         },
//         {
//           include: "#string",
//         },
//       ],
//       "#abstract": [
//         {
//           token: "storage.modifier.abstract.ql",
//           regex: /\babstract(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#bindingset": [
//         {
//           token: "storage.modifier.bindingset.ql",
//           regex: /\bbindingset(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#cached": [
//         {
//           token: "storage.modifier.cached.ql",
//           regex: /\bcached(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#deprecated": [
//         {
//           token: "storage.modifier.deprecated.ql",
//           regex: /\bdeprecated(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#external": [
//         {
//           token: "storage.modifier.external.ql",
//           regex: /\bexternal(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#final": [
//         {
//           token: "storage.modifier.final.ql",
//           regex: /\bfinal(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#language": [
//         {
//           token: "storage.modifier.language.ql",
//           regex: /\blanguage(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#library": [
//         {
//           token: "storage.modifier.library.ql",
//           regex: /\blibrary(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#override": [
//         {
//           token: "storage.modifier.override.ql",
//           regex: /\boverride(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#pragma": [
//         {
//           token: "storage.modifier.pragma.ql",
//           regex: /\bpragma(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#private": [
//         {
//           token: "storage.modifier.private.ql",
//           regex: /\bprivate(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#query": [
//         {
//           token: "storage.modifier.query.ql",
//           regex: /\bquery(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#transient": [
//         {
//           token: "storage.modifier.transient.ql",
//           regex: /\btransient(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#annotation-keyword": [
//         {
//           include: "#abstract",
//         },
//         {
//           include: "#bindingset",
//         },
//         {
//           include: "#cached",
//         },
//         {
//           include: "#deprecated",
//         },
//         {
//           include: "#external",
//         },
//         {
//           include: "#final",
//         },
//         {
//           include: "#language",
//         },
//         {
//           include: "#library",
//         },
//         {
//           include: "#override",
//         },
//         {
//           include: "#pragma",
//         },
//         {
//           include: "#private",
//         },
//         {
//           include: "#query",
//         },
//         {
//           include: "#transient",
//         },
//       ],
//       "#comment": [
//         {
//           token: "comment.block.documentation.ql",
//           regex: /\/\*\*/,
//           push: [
//             {
//               token: "comment.block.documentation.ql",
//               regex: /\*\//,
//               next: "pop",
//             },
//             {
//               todo: {
//                 begin: "(?x)(?<=/\\*\\*)([^*]|\\*(?!/))*$",
//                 while: "(?x)(^|\\G)\\s*([^*]|\\*(?!/))(?=([^*]|[*](?!/))*$)",
//                 patterns: [
//                   {
//                     match: "(?x)\\G\\s* (@\\S+)",
//                     name: "keyword.tag.ql",
//                   },
//                 ],
//               },
//             },
//             {
//               defaultToken: "comment.block.documentation.ql",
//             },
//           ],
//         },
//         {
//           token: "comment.block.ql",
//           regex: /\/\*/,
//           push: [
//             {
//               token: "comment.block.ql",
//               regex: /\*\//,
//               next: "pop",
//             },
//             {
//               defaultToken: "comment.block.ql",
//             },
//           ],
//         },
//         {
//           token: "comment.line.double-slash.ql",
//           regex: /\/\/.*$/,
//         },
//       ],
//       "#module-member": [
//         {
//           include: "#import-directive",
//         },
//         {
//           include: "#import-as-clause",
//         },
//         {
//           include: "#module-declaration",
//         },
//         {
//           include: "#class-declaration",
//         },
//         {
//           include: "#select-clause",
//         },
//         {
//           include: "#predicate-or-field-declaration",
//         },
//         {
//           include: "#non-context-sensitive",
//         },
//         {
//           include: "#annotation",
//         },
//       ],
//       "#import-directive": [
//         {
//           token: "meta.block.import-directive.ql",
//           regex: /\bimport(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "entity.name.type.namespace.ql",
//               regex: /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])(?!\s*(?:\.|::))/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "entity.name.type.namespace.ql",
//               regex: /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.import-directive.ql",
//             },
//           ],
//         },
//       ],
//       "#end-of-as-clause": [
//         {
//           token: "text",
//           regex:
//             /(?<=[0-9A-Za-z_])(?![0-9A-Za-z_])(?<!(?<![0-9A-Za-z_])as)|(?=\s*(?!(?:\/\/|\/\*)|\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_]))\S)|(?=\s*(?:\b_(?![0-9A-Za-z_])|\band(?![0-9A-Za-z_])|\bany(?![0-9A-Za-z_])|\bas(?![0-9A-Za-z_])|\basc(?![0-9A-Za-z_])|\bavg(?![0-9A-Za-z_])|\bboolean(?![0-9A-Za-z_])|\bby(?![0-9A-Za-z_])|\bclass(?![0-9A-Za-z_])|\bconcat(?![0-9A-Za-z_])|\bcount(?![0-9A-Za-z_])|\bdate(?![0-9A-Za-z_])|\bdesc(?![0-9A-Za-z_])|\belse(?![0-9A-Za-z_])|\bexists(?![0-9A-Za-z_])|\bextends(?![0-9A-Za-z_])|\bfalse(?![0-9A-Za-z_])|\bfloat(?![0-9A-Za-z_])|\bforall(?![0-9A-Za-z_])|\bforex(?![0-9A-Za-z_])|\bfrom(?![0-9A-Za-z_])|\bif(?![0-9A-Za-z_])|\bimplies(?![0-9A-Za-z_])|\bimport(?![0-9A-Za-z_])|\bin(?![0-9A-Za-z_])|\binstanceof(?![0-9A-Za-z_])|\bint(?![0-9A-Za-z_])|\bmax(?![0-9A-Za-z_])|\bmin(?![0-9A-Za-z_])|\bmodule(?![0-9A-Za-z_])|\bnewtype(?![0-9A-Za-z_])|\bnone(?![0-9A-Za-z_])|\bnot(?![0-9A-Za-z_])|\bor(?![0-9A-Za-z_])|\border(?![0-9A-Za-z_])|\bpredicate(?![0-9A-Za-z_])|\brank(?![0-9A-Za-z_])|\bresult(?![0-9A-Za-z_])|\bselect(?![0-9A-Za-z_])|\bstrictconcat(?![0-9A-Za-z_])|\bstrictcount(?![0-9A-Za-z_])|\bstrictsum(?![0-9A-Za-z_])|\bstring(?![0-9A-Za-z_])|\bsum(?![0-9A-Za-z_])|\bsuper(?![0-9A-Za-z_])|\bthen(?![0-9A-Za-z_])|\bthis(?![0-9A-Za-z_])|\btrue(?![0-9A-Za-z_])|\bwhere(?![0-9A-Za-z_])))/,
//         },
//       ],
//       "#import-as-clause": [
//         {
//           token: "meta.block.import-as-clause.ql",
//           regex: /\bas(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.import-as-clause.ql",
//               regex:
//                 /(?<=[0-9A-Za-z_])(?![0-9A-Za-z_])(?<!(?<![0-9A-Za-z_])as)|(?=\s*(?!(?:\/\/|\/\*)|\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_]))\S)|(?=\s*(?:\b_(?![0-9A-Za-z_])|\band(?![0-9A-Za-z_])|\bany(?![0-9A-Za-z_])|\bas(?![0-9A-Za-z_])|\basc(?![0-9A-Za-z_])|\bavg(?![0-9A-Za-z_])|\bboolean(?![0-9A-Za-z_])|\bby(?![0-9A-Za-z_])|\bclass(?![0-9A-Za-z_])|\bconcat(?![0-9A-Za-z_])|\bcount(?![0-9A-Za-z_])|\bdate(?![0-9A-Za-z_])|\bdesc(?![0-9A-Za-z_])|\belse(?![0-9A-Za-z_])|\bexists(?![0-9A-Za-z_])|\bextends(?![0-9A-Za-z_])|\bfalse(?![0-9A-Za-z_])|\bfloat(?![0-9A-Za-z_])|\bforall(?![0-9A-Za-z_])|\bforex(?![0-9A-Za-z_])|\bfrom(?![0-9A-Za-z_])|\bif(?![0-9A-Za-z_])|\bimplies(?![0-9A-Za-z_])|\bimport(?![0-9A-Za-z_])|\bin(?![0-9A-Za-z_])|\binstanceof(?![0-9A-Za-z_])|\bint(?![0-9A-Za-z_])|\bmax(?![0-9A-Za-z_])|\bmin(?![0-9A-Za-z_])|\bmodule(?![0-9A-Za-z_])|\bnewtype(?![0-9A-Za-z_])|\bnone(?![0-9A-Za-z_])|\bnot(?![0-9A-Za-z_])|\bor(?![0-9A-Za-z_])|\border(?![0-9A-Za-z_])|\bpredicate(?![0-9A-Za-z_])|\brank(?![0-9A-Za-z_])|\bresult(?![0-9A-Za-z_])|\bselect(?![0-9A-Za-z_])|\bstrictconcat(?![0-9A-Za-z_])|\bstrictcount(?![0-9A-Za-z_])|\bstrictsum(?![0-9A-Za-z_])|\bstring(?![0-9A-Za-z_])|\bsum(?![0-9A-Za-z_])|\bsuper(?![0-9A-Za-z_])|\bthen(?![0-9A-Za-z_])|\bthis(?![0-9A-Za-z_])|\btrue(?![0-9A-Za-z_])|\bwhere(?![0-9A-Za-z_])))/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "entity.name.type.namespace.ql",
//               regex: /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.import-as-clause.ql",
//             },
//           ],
//         },
//       ],
//       "#module-declaration": [
//         {
//           token: "meta.block.module-declaration.ql",
//           regex: /\bmodule(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.module-declaration.ql",
//               regex: /(?<=\}|;)/,
//               next: "pop",
//             },
//             {
//               include: "#module-body",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "entity.name.type.namespace.ql",
//               regex: /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.module-declaration.ql",
//             },
//           ],
//         },
//       ],
//       "#module-body": [
//         {
//           token: "meta.block.module-body.ql",
//           regex: /\{/,
//           push: [
//             {
//               token: "meta.block.module-body.ql",
//               regex: /\}/,
//               next: "pop",
//             },
//             {
//               include: "#module-member",
//             },
//             {
//               defaultToken: "meta.block.module-body.ql",
//             },
//           ],
//         },
//       ],
//       "#module-qualifier": [
//         {
//           token: "entity.name.type.namespace.ql",
//           regex: /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])(?=\s*::)/,
//         },
//       ],
//       "#predicate-or-field-declaration": [
//         {
//           token: "meta.block.predicate-or-field-declaration.ql",
//           regex:
//             /(?=\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_]))(?!(?:\b_(?![0-9A-Za-z_])|\band(?![0-9A-Za-z_])|\bany(?![0-9A-Za-z_])|\bas(?![0-9A-Za-z_])|\basc(?![0-9A-Za-z_])|\bavg(?![0-9A-Za-z_])|\bboolean(?![0-9A-Za-z_])|\bby(?![0-9A-Za-z_])|\bclass(?![0-9A-Za-z_])|\bconcat(?![0-9A-Za-z_])|\bcount(?![0-9A-Za-z_])|\bdate(?![0-9A-Za-z_])|\bdesc(?![0-9A-Za-z_])|\belse(?![0-9A-Za-z_])|\bexists(?![0-9A-Za-z_])|\bextends(?![0-9A-Za-z_])|\bfalse(?![0-9A-Za-z_])|\bfloat(?![0-9A-Za-z_])|\bforall(?![0-9A-Za-z_])|\bforex(?![0-9A-Za-z_])|\bfrom(?![0-9A-Za-z_])|\bif(?![0-9A-Za-z_])|\bimplies(?![0-9A-Za-z_])|\bimport(?![0-9A-Za-z_])|\bin(?![0-9A-Za-z_])|\binstanceof(?![0-9A-Za-z_])|\bint(?![0-9A-Za-z_])|\bmax(?![0-9A-Za-z_])|\bmin(?![0-9A-Za-z_])|\bmodule(?![0-9A-Za-z_])|\bnewtype(?![0-9A-Za-z_])|\bnone(?![0-9A-Za-z_])|\bnot(?![0-9A-Za-z_])|\bor(?![0-9A-Za-z_])|\border(?![0-9A-Za-z_])|\bpredicate(?![0-9A-Za-z_])|\brank(?![0-9A-Za-z_])|\bresult(?![0-9A-Za-z_])|\bselect(?![0-9A-Za-z_])|\bstrictconcat(?![0-9A-Za-z_])|\bstrictcount(?![0-9A-Za-z_])|\bstrictsum(?![0-9A-Za-z_])|\bstring(?![0-9A-Za-z_])|\bsum(?![0-9A-Za-z_])|\bsuper(?![0-9A-Za-z_])|\bthen(?![0-9A-Za-z_])|\bthis(?![0-9A-Za-z_])|\btrue(?![0-9A-Za-z_])|\bwhere(?![0-9A-Za-z_]))|(?:\babstract(?![0-9A-Za-z_])|\bbindingset(?![0-9A-Za-z_])|\bcached(?![0-9A-Za-z_])|\bdeprecated(?![0-9A-Za-z_])|\bexternal(?![0-9A-Za-z_])|\bfinal(?![0-9A-Za-z_])|\blanguage(?![0-9A-Za-z_])|\blibrary(?![0-9A-Za-z_])|\boverride(?![0-9A-Za-z_])|\bpragma(?![0-9A-Za-z_])|\bprivate(?![0-9A-Za-z_])|\bquery(?![0-9A-Za-z_])|\btransient(?![0-9A-Za-z_])))|(?=(?:\bboolean(?![0-9A-Za-z_])|\bdate(?![0-9A-Za-z_])|\bfloat(?![0-9A-Za-z_])|\bint(?![0-9A-Za-z_])|\bpredicate(?![0-9A-Za-z_])|\bstring(?![0-9A-Za-z_])))|(?=@[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_]))/,
//           push: [
//             {
//               token: "meta.block.predicate-or-field-declaration.ql",
//               regex: /(?<=\}|;)/,
//               next: "pop",
//             },
//             {
//               include: "#predicate-parameter-list",
//             },
//             {
//               include: "#predicate-body",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               include: "#module-qualifier",
//             },
//             {
//               token: "variable.field.ql",
//               regex: /\b[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])(?=\s*;)/,
//             },
//             {
//               token: "entity.name.function.ql",
//               regex: /\b[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               token: "entity.name.type.ql",
//               regex:
//                 /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])|@[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.predicate-or-field-declaration.ql",
//             },
//           ],
//         },
//       ],
//       "#predicate-parameter-list": [
//         {
//           token: "meta.block.predicate-parameter-list.ql",
//           regex: /\(/,
//           push: [
//             {
//               token: "meta.block.predicate-parameter-list.ql",
//               regex: /\)/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "variable.parameter.ql",
//               regex: /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])(?=\s*(?:,|\)))/,
//             },
//             {
//               include: "#module-qualifier",
//             },
//             {
//               token: "entity.name.type.ql",
//               regex:
//                 /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])|@[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               token: "variable.parameter.ql",
//               regex: /\b[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.predicate-parameter-list.ql",
//             },
//           ],
//         },
//       ],
//       "#expr-as-clause": [
//         {
//           token: "meta.block.expr-as-clause.ql",
//           regex: /\bas(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.expr-as-clause.ql",
//               regex:
//                 /(?<=[0-9A-Za-z_])(?![0-9A-Za-z_])(?<!(?<![0-9A-Za-z_])as)|(?=\s*(?!(?:\/\/|\/\*)|\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_]))\S)|(?=\s*(?:\b_(?![0-9A-Za-z_])|\band(?![0-9A-Za-z_])|\bany(?![0-9A-Za-z_])|\bas(?![0-9A-Za-z_])|\basc(?![0-9A-Za-z_])|\bavg(?![0-9A-Za-z_])|\bboolean(?![0-9A-Za-z_])|\bby(?![0-9A-Za-z_])|\bclass(?![0-9A-Za-z_])|\bconcat(?![0-9A-Za-z_])|\bcount(?![0-9A-Za-z_])|\bdate(?![0-9A-Za-z_])|\bdesc(?![0-9A-Za-z_])|\belse(?![0-9A-Za-z_])|\bexists(?![0-9A-Za-z_])|\bextends(?![0-9A-Za-z_])|\bfalse(?![0-9A-Za-z_])|\bfloat(?![0-9A-Za-z_])|\bforall(?![0-9A-Za-z_])|\bforex(?![0-9A-Za-z_])|\bfrom(?![0-9A-Za-z_])|\bif(?![0-9A-Za-z_])|\bimplies(?![0-9A-Za-z_])|\bimport(?![0-9A-Za-z_])|\bin(?![0-9A-Za-z_])|\binstanceof(?![0-9A-Za-z_])|\bint(?![0-9A-Za-z_])|\bmax(?![0-9A-Za-z_])|\bmin(?![0-9A-Za-z_])|\bmodule(?![0-9A-Za-z_])|\bnewtype(?![0-9A-Za-z_])|\bnone(?![0-9A-Za-z_])|\bnot(?![0-9A-Za-z_])|\bor(?![0-9A-Za-z_])|\border(?![0-9A-Za-z_])|\bpredicate(?![0-9A-Za-z_])|\brank(?![0-9A-Za-z_])|\bresult(?![0-9A-Za-z_])|\bselect(?![0-9A-Za-z_])|\bstrictconcat(?![0-9A-Za-z_])|\bstrictcount(?![0-9A-Za-z_])|\bstrictsum(?![0-9A-Za-z_])|\bstring(?![0-9A-Za-z_])|\bsum(?![0-9A-Za-z_])|\bsuper(?![0-9A-Za-z_])|\bthen(?![0-9A-Za-z_])|\bthis(?![0-9A-Za-z_])|\btrue(?![0-9A-Za-z_])|\bwhere(?![0-9A-Za-z_])))/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "variable.other.ql",
//               regex: /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.expr-as-clause.ql",
//             },
//           ],
//         },
//       ],
//       "#predicate-body-contents": [
//         {
//           include: "#expr-as-clause",
//         },
//         {
//           include: "#non-context-sensitive",
//         },
//         {
//           include: "#module-qualifier",
//         },
//         {
//           token: "entity.name.function.ql",
//           regex: /\b[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])\s*(?:\*|\+)?\s*(?=\()/,
//         },
//         {
//           token: "variable.other.ql",
//           regex: /\b[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//         },
//         {
//           token: "entity.name.type.ql",
//           regex:
//             /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])|@[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//         },
//       ],
//       "#predicate-body": [
//         {
//           token: "meta.block.predicate-body.ql",
//           regex: /\{/,
//           push: [
//             {
//               token: "meta.block.predicate-body.ql",
//               regex: /\}/,
//               next: "pop",
//             },
//             {
//               include: "#predicate-body-contents",
//             },
//             {
//               defaultToken: "meta.block.predicate-body.ql",
//             },
//           ],
//         },
//       ],
//       "#annotation": [
//         {
//           include: "#bindingset-annotation",
//         },
//         {
//           include: "#language-annotation",
//         },
//         {
//           include: "#pragma-annotation",
//         },
//         {
//           include: "#annotation-keyword",
//         },
//       ],
//       "#bindingset-annotation": [
//         {
//           token: "meta.block.bindingset-annotation.ql",
//           regex: /\bbindingset(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.bindingset-annotation.ql",
//               regex: /(?!\s|(?:\/\/|\/\*)|\[)|(?<=\])/,
//               next: "pop",
//             },
//             {
//               include: "#bindingset-annotation-body",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               defaultToken: "meta.block.bindingset-annotation.ql",
//             },
//           ],
//         },
//       ],
//       "#bindingset-annotation-body": [
//         {
//           token: "meta.block.bindingset-annotation-body.ql",
//           regex: /\[/,
//           push: [
//             {
//               token: "meta.block.bindingset-annotation-body.ql",
//               regex: /\]/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "variable.parameter.ql",
//               regex: /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.bindingset-annotation-body.ql",
//             },
//           ],
//         },
//       ],
//       "#language-annotation": [
//         {
//           token: "meta.block.language-annotation.ql",
//           regex: /\blanguage(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.language-annotation.ql",
//               regex: /(?!\s|(?:\/\/|\/\*)|\[)|(?<=\])/,
//               next: "pop",
//             },
//             {
//               include: "#language-annotation-body",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               defaultToken: "meta.block.language-annotation.ql",
//             },
//           ],
//         },
//       ],
//       "#language-annotation-body": [
//         {
//           token: "meta.block.language-annotation-body.ql",
//           regex: /\[/,
//           push: [
//             {
//               token: "meta.block.language-annotation-body.ql",
//               regex: /\]/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "storage.modifier.ql",
//               regex: /\bmonotonicAggregates(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.language-annotation-body.ql",
//             },
//           ],
//         },
//       ],
//       "#pragma-annotation": [
//         {
//           token: "meta.block.pragma-annotation.ql",
//           regex: /\bpragma(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.pragma-annotation.ql",
//               regex: /(?!\s|(?:\/\/|\/\*)|\[)|(?<=\])/,
//               next: "pop",
//             },
//             {
//               include: "#pragma-annotation-body",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               defaultToken: "meta.block.pragma-annotation.ql",
//             },
//           ],
//         },
//       ],
//       "#pragma-annotation-body": [
//         {
//           token: "meta.block.pragma-annotation-body.ql",
//           regex: /\[/,
//           push: [
//             {
//               token: "meta.block.pragma-annotation-body.ql",
//               regex: /\]/,
//               next: "pop",
//             },
//             {
//               token: "storage.modifier.ql",
//               regex: /\b(?:inline|noinline|nomagic|noopt)\b/,
//             },
//             {
//               defaultToken: "meta.block.pragma-annotation-body.ql",
//             },
//           ],
//         },
//       ],
//       "#newtype-declaration": [
//         {
//           token: "meta.block.newtype.ql",
//           regex: /\bnewtype(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.newtype.ql",
//               regex:
//                 /(?!\s|\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])|(?:\/\/|\/\*)|=|\()/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               include: "#newtype-branch",
//             },
//             {
//               defaultToken: "meta.block.newtype.ql",
//             },
//           ],
//         },
//       ],
//       "#newtype-branch": [
//         {
//           token: "entity.name.type.ql",
//           regex: /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.newtype-branch.ql",
//               regex: /(?<=\})|(?!\s|(?:\/\/|\/\*)|\{)/,
//               next: "pop",
//             },
//             {
//               include: "#predicate-body",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "entity.name.type.ql",
//               regex: /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.newtype-branch.ql",
//             },
//           ],
//         },
//       ],
//       "#class-declaration": [
//         {
//           token: "meta.block.class-declaration.ql",
//           regex: /\bclass(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.class-declaration.ql",
//               regex: /(?<=\}|;)/,
//               next: "pop",
//             },
//             {
//               include: "#class-body",
//             },
//             {
//               include: "#extends-clause",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "entity.name.type.class.ql",
//               regex: /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.class-declaration.ql",
//             },
//           ],
//         },
//       ],
//       "#extends-clause": [
//         {
//           token: "meta.block.extends-clause.ql",
//           regex: /\bextends(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.extends-clause.ql",
//               regex: /(?=\{)/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "entity.name.type.ql",
//               regex:
//                 /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])|@[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.extends-clause.ql",
//             },
//           ],
//         },
//       ],
//       "#class-body": [
//         {
//           token: "meta.block.class-body.ql",
//           regex: /\{/,
//           push: [
//             {
//               token: "meta.block.class-body.ql",
//               regex: /\}/,
//               next: "pop",
//             },
//             {
//               include: "#class-member",
//             },
//             {
//               defaultToken: "meta.block.class-body.ql",
//             },
//           ],
//         },
//       ],
//       "#class-member": [
//         {
//           include: "#predicate-or-field-declaration",
//         },
//         {
//           include: "#annotation",
//         },
//         {
//           include: "#non-context-sensitive",
//         },
//       ],
//       "#select-clause": [
//         {
//           token: "meta.block.select-clause.ql",
//           regex:
//             /(?=\bfrom(?![0-9A-Za-z_])|\bwhere(?![0-9A-Za-z_])|\bselect(?![0-9A-Za-z_]))/,
//           push: [
//             {
//               token: "meta.block.select-clause.ql",
//               regex:
//                 /(?!\bfrom(?![0-9A-Za-z_])|\bwhere(?![0-9A-Za-z_])|\bselect(?![0-9A-Za-z_]))/,
//               next: "pop",
//             },
//             {
//               include: "#from-section",
//             },
//             {
//               include: "#where-section",
//             },
//             {
//               include: "#select-section",
//             },
//             {
//               defaultToken: "meta.block.select-clause.ql",
//             },
//           ],
//         },
//       ],
//       "#from-section": [
//         {
//           token: "meta.block.from-section.ql",
//           regex: /\bfrom(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.from-section.ql",
//               regex: /(?=\bselect(?![0-9A-Za-z_])|\bwhere(?![0-9A-Za-z_]))/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "variable.parameter.ql",
//               regex:
//                 /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])(?=\s*(?:,|\bwhere(?![0-9A-Za-z_])|\bselect(?![0-9A-Za-z_])|$))/,
//             },
//             {
//               include: "#module-qualifier",
//             },
//             {
//               token: "entity.name.type.ql",
//               regex:
//                 /\b[A-Z][0-9A-Za-z_]*(?![0-9A-Za-z_])|@[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               token: "variable.parameter.ql",
//               regex: /\b[a-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//             {
//               defaultToken: "meta.block.from-section.ql",
//             },
//           ],
//         },
//       ],
//       "#where-section": [
//         {
//           token: "meta.block.where-section.ql",
//           regex: /\bwhere(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.where-section.ql",
//               regex: /(?=\bselect(?![0-9A-Za-z_]))/,
//               next: "pop",
//             },
//             {
//               include: "#predicate-body-contents",
//             },
//             {
//               defaultToken: "meta.block.where-section.ql",
//             },
//           ],
//         },
//       ],
//       "#select-section": [
//         {
//           token: "meta.block.select-section.ql",
//           regex: /\bselect(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "meta.block.select-section.ql",
//               regex: /(?=$)/,
//               next: "pop",
//             },
//             {
//               include: "#predicate-body-contents",
//             },
//             {
//               include: "#select-as-clause",
//             },
//             {
//               defaultToken: "meta.block.select-section.ql",
//             },
//           ],
//         },
//       ],
//       "#select-as-clause": [
//         {
//           token: "text",
//           regex: /\bas(?![0-9A-Za-z_])/,
//           push: [
//             {
//               token: "text",
//               regex: /(?<=[0-9A-Za-z_](?![0-9A-Za-z_]))/,
//               next: "pop",
//             },
//             {
//               include: "#non-context-sensitive",
//             },
//             {
//               token: "variable.other.ql",
//               regex: /\b[A-Za-z][0-9A-Za-z_]*(?![0-9A-Za-z_])/,
//             },
//           ],
//         },
//       ],
//       "#literal": [
//         {
//           include: "#float-literal",
//         },
//         {
//           include: "#int-literal",
//         },
//         {
//           include: "#string-literal",
//         },
//       ],
//       "#int-literal": [
//         {
//           token: "constant.numeric.decimal.ql",
//           regex: /-?[0-9]+(?![0-9])/,
//         },
//       ],
//       "#float-literal": [
//         {
//           token: "constant.numeric.decimal.ql",
//           regex: /-?[0-9]+\.[0-9]+(?![0-9])/,
//         },
//       ],
//       "#string-literal": [
//         {
//           token: "punctuation.definition.string.begin.ql",
//           regex: /"/,
//           push: [
//             {
//               token: [
//                 "punctuation.definition.string.end.ql",
//                 "invalid.illegal.newline.ql",
//               ],
//               regex: /(")|([^\\$]$)/,
//               next: "pop",
//             },
//             {
//               include: "#string-escape",
//             },
//             {
//               defaultToken: "string.quoted.double.ql",
//             },
//           ],
//         },
//       ],
//       "#string-escape": [
//         {
//           token: "constant.character.escape.ql",
//           regex: /\\["\\nrt]/,
//         },
//       ],
//     };
//   }
// }

// export default class CustomSqlMode extends window.ace.acequire("ace/mode/java")
//   .Mode {
//   constructor() {
//     super();
//     this.HighlightRules = CustomHighlightRules;
//   }
// }
