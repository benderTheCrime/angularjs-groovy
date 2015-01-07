(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// SO meta...
(function(d, a) {
    'use strict';

    module.exports = function(m) {
        m.config(function() {
            var head = a.element(d.head),
                meta = a.element(d.head.getElementsByTagName('meta')),
                name = 'viewport',
                viewport = false;

            angular.forEach(meta, function(v) {
                if (v.name === name) {
                    viewport = true;
                }
            });

            if (!viewport) {
                var viewMeta = d.createElement('meta');
                viewMeta.name = name;
                viewMeta.content = 'user-scalable=no, initial-scale=1, maximum-scale=1, ' +
                                   'minimum-scale=1, width=device-width, height=device-' +
                                   'height';
                head.append(viewMeta);
            }
        });
    };
})(document, angular);

},{}],2:[function(require,module,exports){
(function(d, a) {
    'use strict';

    module.exports = function(m) {
        m.config(
            [
                'conf',
                function(conf) {

                    /**
                    * Your already in the service, which means that we need to
                    * manage attachment of the required styles
                    */
                    var head = a.element(d.head),
                    scripts = a.element(d.head.getElementsByTagName('script')),
                    path;

                    // Get the relative path
                    a.forEach(scripts, function(v) {
                        if (!!~v.src.indexOf('angularjs-groovy')) {
                            path = v.src.replace(v.src.split('/').pop(), '');
                        }
                    });
                    a.forEach(conf.requiredStyles, function(v) {

                        // TODO check to see if styles exist before appendation, move this to a service
                        var link = d.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = ~v.indexOf('http') ? v : path + v;

                        head.append(link);
                    });
                }
            ]
        );
    };
})(document, angular);

},{}],3:[function(require,module,exports){
(function(a) {
    'use strict';

    a.module('angularjs-groovy').controller(
        'baseCtrl',
        [
            '$s',
            '$scope',
            function($s, $scope) {
                $scope.groovyColor = function() {
                    return $s.header.color.replace(' ', '-').toLowerCase();
                };
            }
        ]
    );
})(angular);

},{}],4:[function(require,module,exports){
(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyBase',
        [
            '$s',
            'Handlebars',
            function($s, Handlebars) {
                return {
                    restrict: 'AECM', // DO WHAT YOU DO!!!
                    template: Handlebars.templates.base($s)
                };
            }
        ]
    );
})(angular);

},{}],5:[function(require,module,exports){
(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyFooter',
        [
            '$s',
            'Handlebars',
            function($s, Handlebars) {
                return {
                    restrict: 'E',
                    template: Handlebars.templates.footer($s)
                };
            }
        ]
    );
})(angular);

},{}],6:[function(require,module,exports){
(function(a) {
    'use strict';

    a.module('angularjs-groovy').directive(
        'groovyHeader',
        [
            '$s',
            'Handlebars',
            function($s, Handlebars) {
                return {
                    restrict: 'E',
                    template: Handlebars.templates.header($s)
                };
            }
        ]
    );
})(angular);

},{}],7:[function(require,module,exports){
(function(w, d, a, g) {
    'use strict';

    require('./settings/conf');

    if (typeof a === 'undefined' ||
        typeof g === 'undefined') {

        // What is to be done? no settings, no plugin :`(
        return;
    }

    g = w.groovy;
    g.masterDetail = g.mD || g.masterDetail;
    g.header = g.h || g.header;

    delete g.mD;
    delete g.h;

    var m = a.module('angularjs-groovy', [
        'conf'
    ]).constant('$s', g);

    // Configs to append meta/style
    require('./configs/meta')(m);
    if (g.useStyle !== false) {
        require('./configs/style')(m);
    }

    // Services
    require('./services/Handlebars');

    // Controllers
    require('./controllers/base');

    // Directives
    require('./directives/base');
    require('./directives/header');
    require('./directives/footer');
    // require('./directives/masterDetail');

})(window, document, angular, groovy || window.groovy);

},{"./configs/meta":1,"./configs/style":2,"./controllers/base":3,"./directives/base":4,"./directives/footer":5,"./directives/header":6,"./services/Handlebars":9,"./settings/conf":10}],8:[function(require,module,exports){
(function() {
    'use strict';

    module.exports = function(H) {
        H.registerHelper('ifor', function(v1, v2, options) {
            if (v1 || v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    };
})();

},{}],9:[function(require,module,exports){
(function(a) {
    'use strict';

    a.module('angularjs-groovy').service(
        'Handlebars',
        function() {
            var Handlebars = require('handlebars');

            require('../templates');
            require('../misc/helpers')(Handlebars);

            return Handlebars;
        }
    );
})(angular);

},{"../misc/helpers":8,"../templates":11,"handlebars":42}],10:[function(require,module,exports){
(function(a) {
    'use strict';

    var conf = {

        // Required stylesheets
        requiredStyles: [
            'https://rawgit.com/hoarrd/drunken-parrot-flat-ui/' +
                'master/css/drunken-parrot.css',
            'angularjs-groovy.css'
        ]
    };

    a.module('conf', []).constant('conf', conf);

    module.exports = conf;
})(angular);

},{}],11:[function(require,module,exports){
var Handlebars = require('Handlebars');
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['base'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n    <groovy-header></groovy-header>\n";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n        \n";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n    <groovy-footer>\n";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.header), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.masterDetail), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

templates['footer'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class='groovy-footer' ng-controller='baseCtrl' ng-class='groovyColor()'>\n</div>\n";
  });

templates['header'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class='groovy-header' ng-controller='baseCtrl' ng-class='groovyColor()'>\n    <h1>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.header)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.h)),stack1 == null || stack1 === false ? stack1 : stack1.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n</div>\n";
  return buffer;
  });

},{"Handlebars":26}],12:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var Handlebars = require("./handlebars.runtime")["default"];

// Compiler imports
var AST = require("./handlebars/compiler/ast")["default"];
var Parser = require("./handlebars/compiler/base").parser;
var parse = require("./handlebars/compiler/base").parse;
var Compiler = require("./handlebars/compiler/compiler").Compiler;
var compile = require("./handlebars/compiler/compiler").compile;
var precompile = require("./handlebars/compiler/compiler").precompile;
var JavaScriptCompiler = require("./handlebars/compiler/javascript-compiler")["default"];

var _create = Handlebars.create;
var create = function() {
  var hb = _create();

  hb.compile = function(input, options) {
    return compile(input, options, hb);
  };
  hb.precompile = function (input, options) {
    return precompile(input, options, hb);
  };

  hb.AST = AST;
  hb.Compiler = Compiler;
  hb.JavaScriptCompiler = JavaScriptCompiler;
  hb.Parser = Parser;
  hb.parse = parse;

  return hb;
};

Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars.runtime":13,"./handlebars/compiler/ast":15,"./handlebars/compiler/base":16,"./handlebars/compiler/compiler":17,"./handlebars/compiler/javascript-compiler":18}],13:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars/base":14,"./handlebars/exception":22,"./handlebars/runtime":23,"./handlebars/safe-string":24,"./handlebars/utils":25}],14:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "1.3.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 4;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn, inverse) {
    if (toString.call(name) === objectType) {
      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      if (inverse) { fn.not = inverse; }
      this.helpers[name] = fn;
    }
  },

  registerPartial: function(name, str) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = str;
    }
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(arg) {
    if(arguments.length === 2) {
      return undefined;
    } else {
      throw new Exception("Missing helper: '" + arg + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse || function() {}, fn = options.fn;

    if (isFunction(context)) { context = context.call(this); }

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      return fn(context);
    }
  });

  instance.registerHelper('each', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) { 
              data.key = key; 
              data.index = i;
              data.first = (i === 0);
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    if (!Utils.isEmpty(context)) return options.fn(context);
  });

  instance.registerHelper('log', function(context, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, context);
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, obj) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};
exports.logger = logger;
function log(level, obj) { logger.log(level, obj); }

exports.log = log;var createFrame = function(object) {
  var obj = {};
  Utils.extend(obj, object);
  return obj;
};
exports.createFrame = createFrame;
},{"./exception":22,"./utils":25}],15:[function(require,module,exports){
"use strict";
var Exception = require("../exception")["default"];

function LocationInfo(locInfo){
  locInfo = locInfo || {};
  this.firstLine   = locInfo.first_line;
  this.firstColumn = locInfo.first_column;
  this.lastColumn  = locInfo.last_column;
  this.lastLine    = locInfo.last_line;
}

var AST = {
  ProgramNode: function(statements, inverseStrip, inverse, locInfo) {
    var inverseLocationInfo, firstInverseNode;
    if (arguments.length === 3) {
      locInfo = inverse;
      inverse = null;
    } else if (arguments.length === 2) {
      locInfo = inverseStrip;
      inverseStrip = null;
    }

    LocationInfo.call(this, locInfo);
    this.type = "program";
    this.statements = statements;
    this.strip = {};

    if(inverse) {
      firstInverseNode = inverse[0];
      if (firstInverseNode) {
        inverseLocationInfo = {
          first_line: firstInverseNode.firstLine,
          last_line: firstInverseNode.lastLine,
          last_column: firstInverseNode.lastColumn,
          first_column: firstInverseNode.firstColumn
        };
        this.inverse = new AST.ProgramNode(inverse, inverseStrip, inverseLocationInfo);
      } else {
        this.inverse = new AST.ProgramNode(inverse, inverseStrip);
      }
      this.strip.right = inverseStrip.left;
    } else if (inverseStrip) {
      this.strip.left = inverseStrip.right;
    }
  },

  MustacheNode: function(rawParams, hash, open, strip, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "mustache";
    this.strip = strip;

    // Open may be a string parsed from the parser or a passed boolean flag
    if (open != null && open.charAt) {
      // Must use charAt to support IE pre-10
      var escapeFlag = open.charAt(3) || open.charAt(2);
      this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
    } else {
      this.escaped = !!open;
    }

    if (rawParams instanceof AST.SexprNode) {
      this.sexpr = rawParams;
    } else {
      // Support old AST API
      this.sexpr = new AST.SexprNode(rawParams, hash);
    }

    this.sexpr.isRoot = true;

    // Support old AST API that stored this info in MustacheNode
    this.id = this.sexpr.id;
    this.params = this.sexpr.params;
    this.hash = this.sexpr.hash;
    this.eligibleHelper = this.sexpr.eligibleHelper;
    this.isHelper = this.sexpr.isHelper;
  },

  SexprNode: function(rawParams, hash, locInfo) {
    LocationInfo.call(this, locInfo);

    this.type = "sexpr";
    this.hash = hash;

    var id = this.id = rawParams[0];
    var params = this.params = rawParams.slice(1);

    // a mustache is an eligible helper if:
    // * its id is simple (a single part, not `this` or `..`)
    var eligibleHelper = this.eligibleHelper = id.isSimple;

    // a mustache is definitely a helper if:
    // * it is an eligible helper, and
    // * it has at least one parameter or hash segment
    this.isHelper = eligibleHelper && (params.length || hash);

    // if a mustache is an eligible helper but not a definite
    // helper, it is ambiguous, and will be resolved in a later
    // pass or at runtime.
  },

  PartialNode: function(partialName, context, strip, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type         = "partial";
    this.partialName  = partialName;
    this.context      = context;
    this.strip = strip;
  },

  BlockNode: function(mustache, program, inverse, close, locInfo) {
    LocationInfo.call(this, locInfo);

    if(mustache.sexpr.id.original !== close.path.original) {
      throw new Exception(mustache.sexpr.id.original + " doesn't match " + close.path.original, this);
    }

    this.type = 'block';
    this.mustache = mustache;
    this.program  = program;
    this.inverse  = inverse;

    this.strip = {
      left: mustache.strip.left,
      right: close.strip.right
    };

    (program || inverse).strip.left = mustache.strip.right;
    (inverse || program).strip.right = close.strip.left;

    if (inverse && !program) {
      this.isInverse = true;
    }
  },

  ContentNode: function(string, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "content";
    this.string = string;
  },

  HashNode: function(pairs, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "hash";
    this.pairs = pairs;
  },

  IdNode: function(parts, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "ID";

    var original = "",
        dig = [],
        depth = 0;

    for(var i=0,l=parts.length; i<l; i++) {
      var part = parts[i].part;
      original += (parts[i].separator || '') + part;

      if (part === ".." || part === "." || part === "this") {
        if (dig.length > 0) {
          throw new Exception("Invalid path: " + original, this);
        } else if (part === "..") {
          depth++;
        } else {
          this.isScoped = true;
        }
      } else {
        dig.push(part);
      }
    }

    this.original = original;
    this.parts    = dig;
    this.string   = dig.join('.');
    this.depth    = depth;

    // an ID is simple if it only has one part, and that part is not
    // `..` or `this`.
    this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

    this.stringModeValue = this.string;
  },

  PartialNameNode: function(name, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "PARTIAL_NAME";
    this.name = name.original;
  },

  DataNode: function(id, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "DATA";
    this.id = id;
  },

  StringNode: function(string, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "STRING";
    this.original =
      this.string =
      this.stringModeValue = string;
  },

  IntegerNode: function(integer, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "INTEGER";
    this.original =
      this.integer = integer;
    this.stringModeValue = Number(integer);
  },

  BooleanNode: function(bool, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "BOOLEAN";
    this.bool = bool;
    this.stringModeValue = bool === "true";
  },

  CommentNode: function(comment, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "comment";
    this.comment = comment;
  }
};

// Must be exported as an object rather than the root of the module as the jison lexer
// most modify the object to operate properly.
exports["default"] = AST;
},{"../exception":22}],16:[function(require,module,exports){
"use strict";
var parser = require("./parser")["default"];
var AST = require("./ast")["default"];

exports.parser = parser;

function parse(input) {
  // Just return if an already-compile AST was passed in.
  if(input.constructor === AST.ProgramNode) { return input; }

  parser.yy = AST;
  return parser.parse(input);
}

exports.parse = parse;
},{"./ast":15,"./parser":19}],17:[function(require,module,exports){
"use strict";
var Exception = require("../exception")["default"];

function Compiler() {}

exports.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
// function in a context. This is necessary for mustache compatibility, which
// requires that context functions in blocks are evaluated by blockHelperMissing,
// and then proceed as if the resulting value was provided to blockHelperMissing.

Compiler.prototype = {
  compiler: Compiler,

  disassemble: function() {
    var opcodes = this.opcodes, opcode, out = [], params, param;

    for (var i=0, l=opcodes.length; i<l; i++) {
      opcode = opcodes[i];

      if (opcode.opcode === 'DECLARE') {
        out.push("DECLARE " + opcode.name + "=" + opcode.value);
      } else {
        params = [];
        for (var j=0; j<opcode.args.length; j++) {
          param = opcode.args[j];
          if (typeof param === "string") {
            param = "\"" + param.replace("\n", "\\n") + "\"";
          }
          params.push(param);
        }
        out.push(opcode.opcode + " " + params.join(" "));
      }
    }

    return out.join("\n");
  },

  equals: function(other) {
    var len = this.opcodes.length;
    if (other.opcodes.length !== len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      var opcode = this.opcodes[i],
          otherOpcode = other.opcodes[i];
      if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
        return false;
      }
      for (var j = 0; j < opcode.args.length; j++) {
        if (opcode.args[j] !== otherOpcode.args[j]) {
          return false;
        }
      }
    }

    len = this.children.length;
    if (other.children.length !== len) {
      return false;
    }
    for (i = 0; i < len; i++) {
      if (!this.children[i].equals(other.children[i])) {
        return false;
      }
    }

    return true;
  },

  guid: 0,

  compile: function(program, options) {
    this.opcodes = [];
    this.children = [];
    this.depths = {list: []};
    this.options = options;

    // These changes will propagate to the other compiler components
    var knownHelpers = this.options.knownHelpers;
    this.options.knownHelpers = {
      'helperMissing': true,
      'blockHelperMissing': true,
      'each': true,
      'if': true,
      'unless': true,
      'with': true,
      'log': true
    };
    if (knownHelpers) {
      for (var name in knownHelpers) {
        this.options.knownHelpers[name] = knownHelpers[name];
      }
    }

    return this.accept(program);
  },

  accept: function(node) {
    var strip = node.strip || {},
        ret;
    if (strip.left) {
      this.opcode('strip');
    }

    ret = this[node.type](node);

    if (strip.right) {
      this.opcode('strip');
    }

    return ret;
  },

  program: function(program) {
    var statements = program.statements;

    for(var i=0, l=statements.length; i<l; i++) {
      this.accept(statements[i]);
    }
    this.isSimple = l === 1;

    this.depths.list = this.depths.list.sort(function(a, b) {
      return a - b;
    });

    return this;
  },

  compileProgram: function(program) {
    var result = new this.compiler().compile(program, this.options);
    var guid = this.guid++, depth;

    this.usePartial = this.usePartial || result.usePartial;

    this.children[guid] = result;

    for(var i=0, l=result.depths.list.length; i<l; i++) {
      depth = result.depths.list[i];

      if(depth < 2) { continue; }
      else { this.addDepth(depth - 1); }
    }

    return guid;
  },

  block: function(block) {
    var mustache = block.mustache,
        program = block.program,
        inverse = block.inverse;

    if (program) {
      program = this.compileProgram(program);
    }

    if (inverse) {
      inverse = this.compileProgram(inverse);
    }

    var sexpr = mustache.sexpr;
    var type = this.classifySexpr(sexpr);

    if (type === "helper") {
      this.helperSexpr(sexpr, program, inverse);
    } else if (type === "simple") {
      this.simpleSexpr(sexpr);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('blockValue');
    } else {
      this.ambiguousSexpr(sexpr, program, inverse);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('ambiguousBlockValue');
    }

    this.opcode('append');
  },

  hash: function(hash) {
    var pairs = hash.pairs, pair, val;

    this.opcode('pushHash');

    for(var i=0, l=pairs.length; i<l; i++) {
      pair = pairs[i];
      val  = pair[1];

      if (this.options.stringParams) {
        if(val.depth) {
          this.addDepth(val.depth);
        }
        this.opcode('getContext', val.depth || 0);
        this.opcode('pushStringParam', val.stringModeValue, val.type);

        if (val.type === 'sexpr') {
          // Subexpressions get evaluated and passed in
          // in string params mode.
          this.sexpr(val);
        }
      } else {
        this.accept(val);
      }

      this.opcode('assignToHash', pair[0]);
    }
    this.opcode('popHash');
  },

  partial: function(partial) {
    var partialName = partial.partialName;
    this.usePartial = true;

    if(partial.context) {
      this.ID(partial.context);
    } else {
      this.opcode('push', 'depth0');
    }

    this.opcode('invokePartial', partialName.name);
    this.opcode('append');
  },

  content: function(content) {
    this.opcode('appendContent', content.string);
  },

  mustache: function(mustache) {
    this.sexpr(mustache.sexpr);

    if(mustache.escaped && !this.options.noEscape) {
      this.opcode('appendEscaped');
    } else {
      this.opcode('append');
    }
  },

  ambiguousSexpr: function(sexpr, program, inverse) {
    var id = sexpr.id,
        name = id.parts[0],
        isBlock = program != null || inverse != null;

    this.opcode('getContext', id.depth);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    this.opcode('invokeAmbiguous', name, isBlock);
  },

  simpleSexpr: function(sexpr) {
    var id = sexpr.id;

    if (id.type === 'DATA') {
      this.DATA(id);
    } else if (id.parts.length) {
      this.ID(id);
    } else {
      // Simplified ID for `this`
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);
      this.opcode('pushContext');
    }

    this.opcode('resolvePossibleLambda');
  },

  helperSexpr: function(sexpr, program, inverse) {
    var params = this.setupFullMustacheParams(sexpr, program, inverse),
        name = sexpr.id.parts[0];

    if (this.options.knownHelpers[name]) {
      this.opcode('invokeKnownHelper', params.length, name);
    } else if (this.options.knownHelpersOnly) {
      throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
    } else {
      this.opcode('invokeHelper', params.length, name, sexpr.isRoot);
    }
  },

  sexpr: function(sexpr) {
    var type = this.classifySexpr(sexpr);

    if (type === "simple") {
      this.simpleSexpr(sexpr);
    } else if (type === "helper") {
      this.helperSexpr(sexpr);
    } else {
      this.ambiguousSexpr(sexpr);
    }
  },

  ID: function(id) {
    this.addDepth(id.depth);
    this.opcode('getContext', id.depth);

    var name = id.parts[0];
    if (!name) {
      this.opcode('pushContext');
    } else {
      this.opcode('lookupOnContext', id.parts[0]);
    }

    for(var i=1, l=id.parts.length; i<l; i++) {
      this.opcode('lookup', id.parts[i]);
    }
  },

  DATA: function(data) {
    this.options.data = true;
    if (data.id.isScoped || data.id.depth) {
      throw new Exception('Scoped data references are not supported: ' + data.original, data);
    }

    this.opcode('lookupData');
    var parts = data.id.parts;
    for(var i=0, l=parts.length; i<l; i++) {
      this.opcode('lookup', parts[i]);
    }
  },

  STRING: function(string) {
    this.opcode('pushString', string.string);
  },

  INTEGER: function(integer) {
    this.opcode('pushLiteral', integer.integer);
  },

  BOOLEAN: function(bool) {
    this.opcode('pushLiteral', bool.bool);
  },

  comment: function() {},

  // HELPERS
  opcode: function(name) {
    this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
  },

  declare: function(name, value) {
    this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
  },

  addDepth: function(depth) {
    if(depth === 0) { return; }

    if(!this.depths[depth]) {
      this.depths[depth] = true;
      this.depths.list.push(depth);
    }
  },

  classifySexpr: function(sexpr) {
    var isHelper   = sexpr.isHelper;
    var isEligible = sexpr.eligibleHelper;
    var options    = this.options;

    // if ambiguous, we can possibly resolve the ambiguity now
    if (isEligible && !isHelper) {
      var name = sexpr.id.parts[0];

      if (options.knownHelpers[name]) {
        isHelper = true;
      } else if (options.knownHelpersOnly) {
        isEligible = false;
      }
    }

    if (isHelper) { return "helper"; }
    else if (isEligible) { return "ambiguous"; }
    else { return "simple"; }
  },

  pushParams: function(params) {
    var i = params.length, param;

    while(i--) {
      param = params[i];

      if(this.options.stringParams) {
        if(param.depth) {
          this.addDepth(param.depth);
        }

        this.opcode('getContext', param.depth || 0);
        this.opcode('pushStringParam', param.stringModeValue, param.type);

        if (param.type === 'sexpr') {
          // Subexpressions get evaluated and passed in
          // in string params mode.
          this.sexpr(param);
        }
      } else {
        this[param.type](param);
      }
    }
  },

  setupFullMustacheParams: function(sexpr, program, inverse) {
    var params = sexpr.params;
    this.pushParams(params);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    if (sexpr.hash) {
      this.hash(sexpr.hash);
    } else {
      this.opcode('emptyHash');
    }

    return params;
  }
};

function precompile(input, options, env) {
  if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
    throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }

  var ast = env.parse(input);
  var environment = new env.Compiler().compile(ast, options);
  return new env.JavaScriptCompiler().compile(environment, options);
}

exports.precompile = precompile;function compile(input, options, env) {
  if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
    throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
  }

  options = options || {};

  if (!('data' in options)) {
    options.data = true;
  }

  var compiled;

  function compileInput() {
    var ast = env.parse(input);
    var environment = new env.Compiler().compile(ast, options);
    var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
    return env.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  return function(context, options) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled.call(this, context, options);
  };
}

exports.compile = compile;
},{"../exception":22}],18:[function(require,module,exports){
"use strict";
var COMPILER_REVISION = require("../base").COMPILER_REVISION;
var REVISION_CHANGES = require("../base").REVISION_CHANGES;
var log = require("../base").log;
var Exception = require("../exception")["default"];

function Literal(value) {
  this.value = value;
}

function JavaScriptCompiler() {}

JavaScriptCompiler.prototype = {
  // PUBLIC API: You can override these methods in a subclass to provide
  // alternative compiled forms for name lookup and buffering semantics
  nameLookup: function(parent, name /* , type*/) {
    var wrap,
        ret;
    if (parent.indexOf('depth') === 0) {
      wrap = true;
    }

    if (/^[0-9]+$/.test(name)) {
      ret = parent + "[" + name + "]";
    } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
      ret = parent + "." + name;
    }
    else {
      ret = parent + "['" + name + "']";
    }

    if (wrap) {
      return '(' + parent + ' && ' + ret + ')';
    } else {
      return ret;
    }
  },

  compilerInfo: function() {
    var revision = COMPILER_REVISION,
        versions = REVISION_CHANGES[revision];
    return "this.compilerInfo = ["+revision+",'"+versions+"'];\n";
  },

  appendToBuffer: function(string) {
    if (this.environment.isSimple) {
      return "return " + string + ";";
    } else {
      return {
        appendToBuffer: true,
        content: string,
        toString: function() { return "buffer += " + string + ";"; }
      };
    }
  },

  initializeBuffer: function() {
    return this.quotedString("");
  },

  namespace: "Handlebars",
  // END PUBLIC API

  compile: function(environment, options, context, asObject) {
    this.environment = environment;
    this.options = options || {};

    log('debug', this.environment.disassemble() + "\n\n");

    this.name = this.environment.name;
    this.isChild = !!context;
    this.context = context || {
      programs: [],
      environments: [],
      aliases: { }
    };

    this.preamble();

    this.stackSlot = 0;
    this.stackVars = [];
    this.registers = { list: [] };
    this.hashes = [];
    this.compileStack = [];
    this.inlineStack = [];

    this.compileChildren(environment, options);

    var opcodes = environment.opcodes, opcode;

    this.i = 0;

    for(var l=opcodes.length; this.i<l; this.i++) {
      opcode = opcodes[this.i];

      if(opcode.opcode === 'DECLARE') {
        this[opcode.name] = opcode.value;
      } else {
        this[opcode.opcode].apply(this, opcode.args);
      }

      // Reset the stripNext flag if it was not set by this operation.
      if (opcode.opcode !== this.stripNext) {
        this.stripNext = false;
      }
    }

    // Flush any trailing content that might be pending.
    this.pushSource('');

    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
      throw new Exception('Compile completed with content left on stack');
    }

    return this.createFunctionContext(asObject);
  },

  preamble: function() {
    var out = [];

    if (!this.isChild) {
      var namespace = this.namespace;

      var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
      if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
      if (this.options.data) { copies = copies + " data = data || {};"; }
      out.push(copies);
    } else {
      out.push('');
    }

    if (!this.environment.isSimple) {
      out.push(", buffer = " + this.initializeBuffer());
    } else {
      out.push("");
    }

    // track the last context pushed into place to allow skipping the
    // getContext opcode when it would be a noop
    this.lastContext = 0;
    this.source = out;
  },

  createFunctionContext: function(asObject) {
    var locals = this.stackVars.concat(this.registers.list);

    if(locals.length > 0) {
      this.source[1] = this.source[1] + ", " + locals.join(", ");
    }

    // Generate minimizer alias mappings
    if (!this.isChild) {
      for (var alias in this.context.aliases) {
        if (this.context.aliases.hasOwnProperty(alias)) {
          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
        }
      }
    }

    if (this.source[1]) {
      this.source[1] = "var " + this.source[1].substring(2) + ";";
    }

    // Merge children
    if (!this.isChild) {
      this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
    }

    if (!this.environment.isSimple) {
      this.pushSource("return buffer;");
    }

    var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

    for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
      params.push("depth" + this.environment.depths.list[i]);
    }

    // Perform a second pass over the output to merge content when possible
    var source = this.mergeSource();

    if (!this.isChild) {
      source = this.compilerInfo()+source;
    }

    if (asObject) {
      params.push(source);

      return Function.apply(this, params);
    } else {
      var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
      log('debug', functionSource + "\n\n");
      return functionSource;
    }
  },
  mergeSource: function() {
    // WARN: We are not handling the case where buffer is still populated as the source should
    // not have buffer append operations as their final action.
    var source = '',
        buffer;
    for (var i = 0, len = this.source.length; i < len; i++) {
      var line = this.source[i];
      if (line.appendToBuffer) {
        if (buffer) {
          buffer = buffer + '\n    + ' + line.content;
        } else {
          buffer = line.content;
        }
      } else {
        if (buffer) {
          source += 'buffer += ' + buffer + ';\n  ';
          buffer = undefined;
        }
        source += line + '\n  ';
      }
    }
    return source;
  },

  // [blockValue]
  //
  // On stack, before: hash, inverse, program, value
  // On stack, after: return value of blockHelperMissing
  //
  // The purpose of this opcode is to take a block of the form
  // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
  // replace it on the stack with the result of properly
  // invoking blockHelperMissing.
  blockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    this.replaceStack(function(current) {
      params.splice(1, 0, current);
      return "blockHelperMissing.call(" + params.join(", ") + ")";
    });
  },

  // [ambiguousBlockValue]
  //
  // On stack, before: hash, inverse, program, value
  // Compiler value, before: lastHelper=value of last found helper, if any
  // On stack, after, if no lastHelper: same as [blockValue]
  // On stack, after, if lastHelper: value
  ambiguousBlockValue: function() {
    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(0, params);

    var current = this.topStack();
    params.splice(1, 0, current);

    this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
  },

  // [appendContent]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Appends the string value of `content` to the current buffer
  appendContent: function(content) {
    if (this.pendingContent) {
      content = this.pendingContent + content;
    }
    if (this.stripNext) {
      content = content.replace(/^\s+/, '');
    }

    this.pendingContent = content;
  },

  // [strip]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Removes any trailing whitespace from the prior content node and flags
  // the next operation for stripping if it is a content node.
  strip: function() {
    if (this.pendingContent) {
      this.pendingContent = this.pendingContent.replace(/\s+$/, '');
    }
    this.stripNext = 'strip';
  },

  // [append]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Coerces `value` to a String and appends it to the current buffer.
  //
  // If `value` is truthy, or 0, it is coerced into a string and appended
  // Otherwise, the empty string is appended
  append: function() {
    // Force anything that is inlined onto the stack so we don't have duplication
    // when we examine local
    this.flushInline();
    var local = this.popStack();
    this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
    if (this.environment.isSimple) {
      this.pushSource("else { " + this.appendToBuffer("''") + " }");
    }
  },

  // [appendEscaped]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Escape `value` and append it to the buffer
  appendEscaped: function() {
    this.context.aliases.escapeExpression = 'this.escapeExpression';

    this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
  },

  // [getContext]
  //
  // On stack, before: ...
  // On stack, after: ...
  // Compiler value, after: lastContext=depth
  //
  // Set the value of the `lastContext` compiler value to the depth
  getContext: function(depth) {
    if(this.lastContext !== depth) {
      this.lastContext = depth;
    }
  },

  // [lookupOnContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext[name], ...
  //
  // Looks up the value of `name` on the current context and pushes
  // it onto the stack.
  lookupOnContext: function(name) {
    this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
  },

  // [pushContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext, ...
  //
  // Pushes the value of the current context onto the stack.
  pushContext: function() {
    this.pushStackLiteral('depth' + this.lastContext);
  },

  // [resolvePossibleLambda]
  //
  // On stack, before: value, ...
  // On stack, after: resolved value, ...
  //
  // If the `value` is a lambda, replace it on the stack by
  // the return value of the lambda
  resolvePossibleLambda: function() {
    this.context.aliases.functionType = '"function"';

    this.replaceStack(function(current) {
      return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
    });
  },

  // [lookup]
  //
  // On stack, before: value, ...
  // On stack, after: value[name], ...
  //
  // Replace the value on the stack with the result of looking
  // up `name` on `value`
  lookup: function(name) {
    this.replaceStack(function(current) {
      return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
    });
  },

  // [lookupData]
  //
  // On stack, before: ...
  // On stack, after: data, ...
  //
  // Push the data lookup operator
  lookupData: function() {
    this.pushStackLiteral('data');
  },

  // [pushStringParam]
  //
  // On stack, before: ...
  // On stack, after: string, currentContext, ...
  //
  // This opcode is designed for use in string mode, which
  // provides the string value of a parameter along with its
  // depth rather than resolving it immediately.
  pushStringParam: function(string, type) {
    this.pushStackLiteral('depth' + this.lastContext);

    this.pushString(type);

    // If it's a subexpression, the string result
    // will be pushed after this opcode.
    if (type !== 'sexpr') {
      if (typeof string === 'string') {
        this.pushString(string);
      } else {
        this.pushStackLiteral(string);
      }
    }
  },

  emptyHash: function() {
    this.pushStackLiteral('{}');

    if (this.options.stringParams) {
      this.push('{}'); // hashContexts
      this.push('{}'); // hashTypes
    }
  },
  pushHash: function() {
    if (this.hash) {
      this.hashes.push(this.hash);
    }
    this.hash = {values: [], types: [], contexts: []};
  },
  popHash: function() {
    var hash = this.hash;
    this.hash = this.hashes.pop();

    if (this.options.stringParams) {
      this.push('{' + hash.contexts.join(',') + '}');
      this.push('{' + hash.types.join(',') + '}');
    }

    this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
  },

  // [pushString]
  //
  // On stack, before: ...
  // On stack, after: quotedString(string), ...
  //
  // Push a quoted version of `string` onto the stack
  pushString: function(string) {
    this.pushStackLiteral(this.quotedString(string));
  },

  // [push]
  //
  // On stack, before: ...
  // On stack, after: expr, ...
  //
  // Push an expression onto the stack
  push: function(expr) {
    this.inlineStack.push(expr);
    return expr;
  },

  // [pushLiteral]
  //
  // On stack, before: ...
  // On stack, after: value, ...
  //
  // Pushes a value onto the stack. This operation prevents
  // the compiler from creating a temporary variable to hold
  // it.
  pushLiteral: function(value) {
    this.pushStackLiteral(value);
  },

  // [pushProgram]
  //
  // On stack, before: ...
  // On stack, after: program(guid), ...
  //
  // Push a program expression onto the stack. This takes
  // a compile-time guid and converts it into a runtime-accessible
  // expression.
  pushProgram: function(guid) {
    if (guid != null) {
      this.pushStackLiteral(this.programExpression(guid));
    } else {
      this.pushStackLiteral(null);
    }
  },

  // [invokeHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // Pops off the helper's parameters, invokes the helper,
  // and pushes the helper's return value onto the stack.
  //
  // If the helper is not found, `helperMissing` is called.
  invokeHelper: function(paramSize, name, isRoot) {
    this.context.aliases.helperMissing = 'helpers.helperMissing';
    this.useRegister('helper');

    var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

    var lookup = 'helper = ' + helper.name + ' || ' + nonHelper;
    if (helper.paramsInit) {
      lookup += ',' + helper.paramsInit;
    }

    this.push(
      '('
        + lookup
        + ',helper '
          + '? helper.call(' + helper.callParams + ') '
          + ': helperMissing.call(' + helper.helperMissingParams + '))');

    // Always flush subexpressions. This is both to prevent the compounding size issue that
    // occurs when the code has to be duplicated for inlining and also to prevent errors
    // due to the incorrect options object being passed due to the shared register.
    if (!isRoot) {
      this.flushInline();
    }
  },

  // [invokeKnownHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // This operation is used when the helper is known to exist,
  // so a `helperMissing` fallback is not required.
  invokeKnownHelper: function(paramSize, name) {
    var helper = this.setupHelper(paramSize, name);
    this.push(helper.name + ".call(" + helper.callParams + ")");
  },

  // [invokeAmbiguous]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of disambiguation
  //
  // This operation is used when an expression like `{{foo}}`
  // is provided, but we don't know at compile-time whether it
  // is a helper or a path.
  //
  // This operation emits more code than the other options,
  // and can be avoided by passing the `knownHelpers` and
  // `knownHelpersOnly` flags at compile-time.
  invokeAmbiguous: function(name, helperCall) {
    this.context.aliases.functionType = '"function"';
    this.useRegister('helper');

    this.emptyHash();
    var helper = this.setupHelper(0, name, helperCall);

    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
    var nextStack = this.nextStack();

    if (helper.paramsInit) {
      this.pushSource(helper.paramsInit);
    }
    this.pushSource('if (helper = ' + helperName + ') { ' + nextStack + ' = helper.call(' + helper.callParams + '); }');
    this.pushSource('else { helper = ' + nonHelper + '; ' + nextStack + ' = typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper; }');
  },

  // [invokePartial]
  //
  // On stack, before: context, ...
  // On stack after: result of partial invocation
  //
  // This operation pops off a context, invokes a partial with that context,
  // and pushes the result of the invocation back.
  invokePartial: function(name) {
    var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

    if (this.options.data) {
      params.push("data");
    }

    this.context.aliases.self = "this";
    this.push("self.invokePartial(" + params.join(", ") + ")");
  },

  // [assignToHash]
  //
  // On stack, before: value, hash, ...
  // On stack, after: hash, ...
  //
  // Pops a value and hash off the stack, assigns `hash[key] = value`
  // and pushes the hash back onto the stack.
  assignToHash: function(key) {
    var value = this.popStack(),
        context,
        type;

    if (this.options.stringParams) {
      type = this.popStack();
      context = this.popStack();
    }

    var hash = this.hash;
    if (context) {
      hash.contexts.push("'" + key + "': " + context);
    }
    if (type) {
      hash.types.push("'" + key + "': " + type);
    }
    hash.values.push("'" + key + "': (" + value + ")");
  },

  // HELPERS

  compiler: JavaScriptCompiler,

  compileChildren: function(environment, options) {
    var children = environment.children, child, compiler;

    for(var i=0, l=children.length; i<l; i++) {
      child = children[i];
      compiler = new this.compiler();

      var index = this.matchExistingProgram(child);

      if (index == null) {
        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
        index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context);
        this.context.environments[index] = child;
      } else {
        child.index = index;
        child.name = 'program' + index;
      }
    }
  },
  matchExistingProgram: function(child) {
    for (var i = 0, len = this.context.environments.length; i < len; i++) {
      var environment = this.context.environments[i];
      if (environment && environment.equals(child)) {
        return i;
      }
    }
  },

  programExpression: function(guid) {
    this.context.aliases.self = "this";

    if(guid == null) {
      return "self.noop";
    }

    var child = this.environment.children[guid],
        depths = child.depths.list, depth;

    var programParams = [child.index, child.name, "data"];

    for(var i=0, l = depths.length; i<l; i++) {
      depth = depths[i];

      if(depth === 1) { programParams.push("depth0"); }
      else { programParams.push("depth" + (depth - 1)); }
    }

    return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
  },

  register: function(name, val) {
    this.useRegister(name);
    this.pushSource(name + " = " + val + ";");
  },

  useRegister: function(name) {
    if(!this.registers[name]) {
      this.registers[name] = true;
      this.registers.list.push(name);
    }
  },

  pushStackLiteral: function(item) {
    return this.push(new Literal(item));
  },

  pushSource: function(source) {
    if (this.pendingContent) {
      this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
      this.pendingContent = undefined;
    }

    if (source) {
      this.source.push(source);
    }
  },

  pushStack: function(item) {
    this.flushInline();

    var stack = this.incrStack();
    if (item) {
      this.pushSource(stack + " = " + item + ";");
    }
    this.compileStack.push(stack);
    return stack;
  },

  replaceStack: function(callback) {
    var prefix = '',
        inline = this.isInline(),
        stack,
        createdStack,
        usedLiteral;

    // If we are currently inline then we want to merge the inline statement into the
    // replacement statement via ','
    if (inline) {
      var top = this.popStack(true);

      if (top instanceof Literal) {
        // Literals do not need to be inlined
        stack = top.value;
        usedLiteral = true;
      } else {
        // Get or create the current stack name for use by the inline
        createdStack = !this.stackSlot;
        var name = !createdStack ? this.topStackName() : this.incrStack();

        prefix = '(' + this.push(name) + ' = ' + top + '),';
        stack = this.topStack();
      }
    } else {
      stack = this.topStack();
    }

    var item = callback.call(this, stack);

    if (inline) {
      if (!usedLiteral) {
        this.popStack();
      }
      if (createdStack) {
        this.stackSlot--;
      }
      this.push('(' + prefix + item + ')');
    } else {
      // Prevent modification of the context depth variable. Through replaceStack
      if (!/^stack/.test(stack)) {
        stack = this.nextStack();
      }

      this.pushSource(stack + " = (" + prefix + item + ");");
    }
    return stack;
  },

  nextStack: function() {
    return this.pushStack();
  },

  incrStack: function() {
    this.stackSlot++;
    if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
    return this.topStackName();
  },
  topStackName: function() {
    return "stack" + this.stackSlot;
  },
  flushInline: function() {
    var inlineStack = this.inlineStack;
    if (inlineStack.length) {
      this.inlineStack = [];
      for (var i = 0, len = inlineStack.length; i < len; i++) {
        var entry = inlineStack[i];
        if (entry instanceof Literal) {
          this.compileStack.push(entry);
        } else {
          this.pushStack(entry);
        }
      }
    }
  },
  isInline: function() {
    return this.inlineStack.length;
  },

  popStack: function(wrapped) {
    var inline = this.isInline(),
        item = (inline ? this.inlineStack : this.compileStack).pop();

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      if (!inline) {
        if (!this.stackSlot) {
          throw new Exception('Invalid stack pop');
        }
        this.stackSlot--;
      }
      return item;
    }
  },

  topStack: function(wrapped) {
    var stack = (this.isInline() ? this.inlineStack : this.compileStack),
        item = stack[stack.length - 1];

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      return item;
    }
  },

  quotedString: function(str) {
    return '"' + str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
      .replace(/\u2029/g, '\\u2029') + '"';
  },

  setupHelper: function(paramSize, name, missingParams) {
    var params = [],
        paramsInit = this.setupParams(paramSize, params, missingParams);
    var foundHelper = this.nameLookup('helpers', name, 'helper');

    return {
      params: params,
      paramsInit: paramsInit,
      name: foundHelper,
      callParams: ["depth0"].concat(params).join(", "),
      helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
    };
  },

  setupOptions: function(paramSize, params) {
    var options = [], contexts = [], types = [], param, inverse, program;

    options.push("hash:" + this.popStack());

    if (this.options.stringParams) {
      options.push("hashTypes:" + this.popStack());
      options.push("hashContexts:" + this.popStack());
    }

    inverse = this.popStack();
    program = this.popStack();

    // Avoid setting fn and inverse if neither are set. This allows
    // helpers to do a check for `if (options.fn)`
    if (program || inverse) {
      if (!program) {
        this.context.aliases.self = "this";
        program = "self.noop";
      }

      if (!inverse) {
        this.context.aliases.self = "this";
        inverse = "self.noop";
      }

      options.push("inverse:" + inverse);
      options.push("fn:" + program);
    }

    for(var i=0; i<paramSize; i++) {
      param = this.popStack();
      params.push(param);

      if(this.options.stringParams) {
        types.push(this.popStack());
        contexts.push(this.popStack());
      }
    }

    if (this.options.stringParams) {
      options.push("contexts:[" + contexts.join(",") + "]");
      options.push("types:[" + types.join(",") + "]");
    }

    if(this.options.data) {
      options.push("data:data");
    }

    return options;
  },

  // the params and contexts arguments are passed in arrays
  // to fill in
  setupParams: function(paramSize, params, useRegister) {
    var options = '{' + this.setupOptions(paramSize, params).join(',') + '}';

    if (useRegister) {
      this.useRegister('options');
      params.push('options');
      return 'options=' + options;
    } else {
      params.push(options);
      return '';
    }
  }
};

var reservedWords = (
  "break else new var" +
  " case finally return void" +
  " catch for switch while" +
  " continue function this with" +
  " default if throw" +
  " delete in try" +
  " do instanceof typeof" +
  " abstract enum int short" +
  " boolean export interface static" +
  " byte extends long super" +
  " char final native synchronized" +
  " class float package throws" +
  " const goto private transient" +
  " debugger implements protected volatile" +
  " double import public let yield"
).split(" ");

var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

for(var i=0, l=reservedWords.length; i<l; i++) {
  compilerWords[reservedWords[i]] = true;
}

JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
  if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)) {
    return true;
  }
  return false;
};

exports["default"] = JavaScriptCompiler;
},{"../base":14,"../exception":22}],19:[function(require,module,exports){
"use strict";
/* jshint ignore:start */
/* Jison generated parser */
var handlebars = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"statements":4,"EOF":5,"program":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"sexpr":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"partial_option0":27,"sexpr_repetition0":28,"sexpr_option0":29,"dataName":30,"param":31,"STRING":32,"INTEGER":33,"BOOLEAN":34,"OPEN_SEXPR":35,"CLOSE_SEXPR":36,"hash":37,"hash_repetition_plus0":38,"hashSegment":39,"ID":40,"EQUALS":41,"DATA":42,"pathSegments":43,"SEP":44,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",35:"OPEN_SEXPR",36:"CLOSE_SEXPR",40:"ID",41:"EQUALS",42:"DATA",44:"SEP"},
productions_: [0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[37,1],[39,3],[26,1],[26,1],[26,1],[30,2],[21,1],[43,3],[43,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[38,1],[38,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return new yy.ProgramNode($$[$0-1], this._$); 
break;
case 2: return new yy.ProgramNode([], this._$); 
break;
case 3:this.$ = new yy.ProgramNode([], $$[$0-1], $$[$0], this._$);
break;
case 4:this.$ = new yy.ProgramNode($$[$0-2], $$[$0-1], $$[$0], this._$);
break;
case 5:this.$ = new yy.ProgramNode($$[$0-1], $$[$0], [], this._$);
break;
case 6:this.$ = new yy.ProgramNode($$[$0], this._$);
break;
case 7:this.$ = new yy.ProgramNode([], this._$);
break;
case 8:this.$ = new yy.ProgramNode([], this._$);
break;
case 9:this.$ = [$$[$0]];
break;
case 10: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 11:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0], this._$);
break;
case 12:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0], this._$);
break;
case 13:this.$ = $$[$0];
break;
case 14:this.$ = $$[$0];
break;
case 15:this.$ = new yy.ContentNode($$[$0], this._$);
break;
case 16:this.$ = new yy.CommentNode($$[$0], this._$);
break;
case 17:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 18:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 19:this.$ = {path: $$[$0-1], strip: stripFlags($$[$0-2], $$[$0])};
break;
case 20:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 21:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 22:this.$ = new yy.PartialNode($$[$0-2], $$[$0-1], stripFlags($$[$0-3], $$[$0]), this._$);
break;
case 23:this.$ = stripFlags($$[$0-1], $$[$0]);
break;
case 24:this.$ = new yy.SexprNode([$$[$0-2]].concat($$[$0-1]), $$[$0], this._$);
break;
case 25:this.$ = new yy.SexprNode([$$[$0]], null, this._$);
break;
case 26:this.$ = $$[$0];
break;
case 27:this.$ = new yy.StringNode($$[$0], this._$);
break;
case 28:this.$ = new yy.IntegerNode($$[$0], this._$);
break;
case 29:this.$ = new yy.BooleanNode($$[$0], this._$);
break;
case 30:this.$ = $$[$0];
break;
case 31:$$[$0-1].isHelper = true; this.$ = $$[$0-1];
break;
case 32:this.$ = new yy.HashNode($$[$0], this._$);
break;
case 33:this.$ = [$$[$0-2], $$[$0]];
break;
case 34:this.$ = new yy.PartialNameNode($$[$0], this._$);
break;
case 35:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
break;
case 36:this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0], this._$));
break;
case 37:this.$ = new yy.DataNode($$[$0], this._$);
break;
case 38:this.$ = new yy.IdNode($$[$0], this._$);
break;
case 39: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
break;
case 40:this.$ = [{part: $$[$0]}];
break;
case 43:this.$ = [];
break;
case 44:$$[$0-1].push($$[$0]);
break;
case 47:this.$ = [$$[$0]];
break;
case 48:$$[$0-1].push($$[$0]);
break;
}
},
table: [{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:29,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:30,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:31,21:24,30:25,40:[1,28],42:[1,27],43:26},{21:33,26:32,32:[1,34],33:[1,35],40:[1,28],43:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,40:[1,28],42:[1,27],43:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,43],24:[2,43],28:43,32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43],40:[2,43],42:[2,43]},{18:[2,25],24:[2,25],36:[2,25]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],40:[2,38],42:[2,38],44:[1,44]},{21:45,40:[1,28],43:26},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],42:[2,40],44:[2,40]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,41],21:50,27:49,40:[1,28],43:26},{18:[2,34],40:[2,34]},{18:[2,35],40:[2,35]},{18:[2,36],40:[2,36]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,40:[1,28],43:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,45],21:56,24:[2,45],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:[1,61],36:[2,45],37:55,38:62,39:63,40:[1,64],42:[1,27],43:26},{40:[1,65]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37],40:[2,37],42:[2,37]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,66]},{18:[2,42]},{18:[1,67]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24],36:[2,24]},{18:[2,44],24:[2,44],32:[2,44],33:[2,44],34:[2,44],35:[2,44],36:[2,44],40:[2,44],42:[2,44]},{18:[2,46],24:[2,46],36:[2,46]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26],40:[2,26],42:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27],40:[2,27],42:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],40:[2,28],42:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],40:[2,29],42:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],40:[2,30],42:[2,30]},{17:68,21:24,30:25,40:[1,28],42:[1,27],43:26},{18:[2,32],24:[2,32],36:[2,32],39:69,40:[1,70]},{18:[2,47],24:[2,47],36:[2,47],40:[2,47]},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],41:[1,71],42:[2,40],44:[2,40]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],40:[2,39],42:[2,39],44:[2,39]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{36:[1,72]},{18:[2,48],24:[2,48],36:[2,48],40:[2,48]},{41:[1,71]},{21:56,30:60,31:73,32:[1,57],33:[1,58],34:[1,59],35:[1,61],40:[1,28],42:[1,27],43:26},{18:[2,31],24:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],40:[2,31],42:[2,31]},{18:[2,33],24:[2,33],36:[2,33],40:[2,33]}],
defaultActions: {3:[2,2],16:[2,1],50:[2,42]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};


function stripFlags(open, close) {
  return {
    left: open.charAt(2) === '~',
    right: close.charAt(0) === '~' || close.charAt(1) === '~'
  };
}

/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {


function strip(start, end) {
  return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
}


var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:
                                   if(yy_.yytext.slice(-2) === "\\\\") {
                                     strip(0,1);
                                     this.begin("mu");
                                   } else if(yy_.yytext.slice(-1) === "\\") {
                                     strip(0,1);
                                     this.begin("emu");
                                   } else {
                                     this.begin("mu");
                                   }
                                   if(yy_.yytext) return 14;
                                 
break;
case 1:return 14;
break;
case 2:
                                   this.popState();
                                   return 14;
                                 
break;
case 3:strip(0,4); this.popState(); return 15;
break;
case 4:return 35;
break;
case 5:return 36;
break;
case 6:return 25;
break;
case 7:return 16;
break;
case 8:return 20;
break;
case 9:return 19;
break;
case 10:return 19;
break;
case 11:return 23;
break;
case 12:return 22;
break;
case 13:this.popState(); this.begin('com');
break;
case 14:strip(3,5); this.popState(); return 15;
break;
case 15:return 22;
break;
case 16:return 41;
break;
case 17:return 40;
break;
case 18:return 40;
break;
case 19:return 44;
break;
case 20:// ignore whitespace
break;
case 21:this.popState(); return 24;
break;
case 22:this.popState(); return 18;
break;
case 23:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 32;
break;
case 24:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 32;
break;
case 25:return 42;
break;
case 26:return 34;
break;
case 27:return 34;
break;
case 28:return 33;
break;
case 29:return 40;
break;
case 30:yy_.yytext = strip(1,2); return 40;
break;
case 31:return 'INVALID';
break;
case 32:return 5;
break;
}
};
lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[3],"inclusive":false},"INITIAL":{"rules":[0,1,32],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();exports["default"] = handlebars;
/* jshint ignore:end */
},{}],20:[function(require,module,exports){
"use strict";
var Visitor = require("./visitor")["default"];

function print(ast) {
  return new PrintVisitor().accept(ast);
}

exports.print = print;function PrintVisitor() {
  this.padding = 0;
}

exports.PrintVisitor = PrintVisitor;PrintVisitor.prototype = new Visitor();

PrintVisitor.prototype.pad = function(string, newline) {
  var out = "";

  for(var i=0,l=this.padding; i<l; i++) {
    out = out + "  ";
  }

  out = out + string;

  if(newline !== false) { out = out + "\n"; }
  return out;
};

PrintVisitor.prototype.program = function(program) {
  var out = "",
      statements = program.statements,
      i, l;

  for(i=0, l=statements.length; i<l; i++) {
    out = out + this.accept(statements[i]);
  }

  this.padding--;

  return out;
};

PrintVisitor.prototype.block = function(block) {
  var out = "";

  out = out + this.pad("BLOCK:");
  this.padding++;
  out = out + this.accept(block.mustache);
  if (block.program) {
    out = out + this.pad("PROGRAM:");
    this.padding++;
    out = out + this.accept(block.program);
    this.padding--;
  }
  if (block.inverse) {
    if (block.program) { this.padding++; }
    out = out + this.pad("{{^}}");
    this.padding++;
    out = out + this.accept(block.inverse);
    this.padding--;
    if (block.program) { this.padding--; }
  }
  this.padding--;

  return out;
};

PrintVisitor.prototype.sexpr = function(sexpr) {
  var params = sexpr.params, paramStrings = [], hash;

  for(var i=0, l=params.length; i<l; i++) {
    paramStrings.push(this.accept(params[i]));
  }

  params = "[" + paramStrings.join(", ") + "]";

  hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";

  return this.accept(sexpr.id) + " " + params + hash;
};

PrintVisitor.prototype.mustache = function(mustache) {
  return this.pad("{{ " + this.accept(mustache.sexpr) + " }}");
};

PrintVisitor.prototype.partial = function(partial) {
  var content = this.accept(partial.partialName);
  if(partial.context) { content = content + " " + this.accept(partial.context); }
  return this.pad("{{> " + content + " }}");
};

PrintVisitor.prototype.hash = function(hash) {
  var pairs = hash.pairs;
  var joinedPairs = [], left, right;

  for(var i=0, l=pairs.length; i<l; i++) {
    left = pairs[i][0];
    right = this.accept(pairs[i][1]);
    joinedPairs.push( left + "=" + right );
  }

  return "HASH{" + joinedPairs.join(", ") + "}";
};

PrintVisitor.prototype.STRING = function(string) {
  return '"' + string.string + '"';
};

PrintVisitor.prototype.INTEGER = function(integer) {
  return "INTEGER{" + integer.integer + "}";
};

PrintVisitor.prototype.BOOLEAN = function(bool) {
  return "BOOLEAN{" + bool.bool + "}";
};

PrintVisitor.prototype.ID = function(id) {
  var path = id.parts.join("/");
  if(id.parts.length > 1) {
    return "PATH:" + path;
  } else {
    return "ID:" + path;
  }
};

PrintVisitor.prototype.PARTIAL_NAME = function(partialName) {
    return "PARTIAL:" + partialName.name;
};

PrintVisitor.prototype.DATA = function(data) {
  return "@" + this.accept(data.id);
};

PrintVisitor.prototype.content = function(content) {
  return this.pad("CONTENT[ '" + content.string + "' ]");
};

PrintVisitor.prototype.comment = function(comment) {
  return this.pad("{{! '" + comment.comment + "' }}");
};
},{"./visitor":21}],21:[function(require,module,exports){
"use strict";
function Visitor() {}

Visitor.prototype = {
  constructor: Visitor,

  accept: function(object) {
    return this[object.type](object);
  }
};

exports["default"] = Visitor;
},{}],22:[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],23:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  if (!env) {
    throw new Exception("No environment passed to template");
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
    var result = env.VM.invokePartial.apply(this, arguments);
    if (result != null) { return result; }

    if (env.compile) {
      var options = { helpers: helpers, partials: partials, data: data };
      partials[name] = env.compile(partial, { data: data !== undefined }, env);
      return partials[name](context, options);
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,
    programs: [],
    program: function(i, fn, data) {
      var programWrapper = this.programs[i];
      if(data) {
        programWrapper = program(i, fn, data);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(i, fn);
      }
      return programWrapper;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = {};
        Utils.extend(ret, common);
        Utils.extend(ret, param);
      }
      return ret;
    },
    programWithDepth: env.VM.programWithDepth,
    noop: env.VM.noop,
    compilerInfo: null
  };

  return function(context, options) {
    options = options || {};
    var namespace = options.partial ? options : env,
        helpers,
        partials;

    if (!options.partial) {
      helpers = options.helpers;
      partials = options.partials;
    }
    var result = templateSpec.call(
          container,
          namespace, context,
          helpers,
          partials,
          options.data);

    if (!options.partial) {
      env.VM.checkRevision(container.compilerInfo);
    }

    return result;
  };
}

exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
  var args = Array.prototype.slice.call(arguments, 3);

  var prog = function(context, options) {
    options = options || {};

    return fn.apply(this, [context, options.data || data].concat(args));
  };
  prog.program = i;
  prog.depth = args.length;
  return prog;
}

exports.programWithDepth = programWithDepth;function program(i, fn, data) {
  var prog = function(context, options) {
    options = options || {};

    return fn(context, options.data || data);
  };
  prog.program = i;
  prog.depth = 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;
},{"./base":14,"./exception":22,"./utils":25}],24:[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],25:[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr] || "&amp;";
}

function extend(obj, value) {
  for(var key in value) {
    if(Object.prototype.hasOwnProperty.call(value, key)) {
      obj[key] = value[key];
    }
  }
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (!string && string !== 0) {
    return "";
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;
},{"./safe-string":24}],26:[function(require,module,exports){
// USAGE:
// var handlebars = require('handlebars');

// var local = handlebars.create();

var handlebars = require('../dist/cjs/handlebars')["default"];

handlebars.Visitor = require('../dist/cjs/handlebars/compiler/visitor')["default"];

var printer = require('../dist/cjs/handlebars/compiler/printer');
handlebars.PrintVisitor = printer.PrintVisitor;
handlebars.print = printer.print;

module.exports = handlebars;

// Publish a Node.js require() handler for .handlebars and .hbs files
if (typeof require !== 'undefined' && require.extensions) {
  var extension = function(module, filename) {
    var fs = require("fs");
    var templateString = fs.readFileSync(filename, "utf8");
    module.exports = handlebars.compile(templateString);
  };
  require.extensions[".handlebars"] = extension;
  require.extensions[".hbs"] = extension;
}

},{"../dist/cjs/handlebars":12,"../dist/cjs/handlebars/compiler/printer":20,"../dist/cjs/handlebars/compiler/visitor":21,"fs":27}],27:[function(require,module,exports){

},{}],28:[function(require,module,exports){
module.exports=require(12)
},{"./handlebars.runtime":29,"./handlebars/compiler/ast":31,"./handlebars/compiler/base":32,"./handlebars/compiler/compiler":33,"./handlebars/compiler/javascript-compiler":34}],29:[function(require,module,exports){
module.exports=require(13)
},{"./handlebars/base":30,"./handlebars/exception":38,"./handlebars/runtime":39,"./handlebars/safe-string":40,"./handlebars/utils":41}],30:[function(require,module,exports){
module.exports=require(14)
},{"./exception":38,"./utils":41}],31:[function(require,module,exports){
module.exports=require(15)
},{"../exception":38}],32:[function(require,module,exports){
module.exports=require(16)
},{"./ast":31,"./parser":35}],33:[function(require,module,exports){
module.exports=require(17)
},{"../exception":38}],34:[function(require,module,exports){
module.exports=require(18)
},{"../base":30,"../exception":38}],35:[function(require,module,exports){
module.exports=require(19)
},{}],36:[function(require,module,exports){
module.exports=require(20)
},{"./visitor":37}],37:[function(require,module,exports){
module.exports=require(21)
},{}],38:[function(require,module,exports){
module.exports=require(22)
},{}],39:[function(require,module,exports){
module.exports=require(23)
},{"./base":30,"./exception":38,"./utils":41}],40:[function(require,module,exports){
module.exports=require(24)
},{}],41:[function(require,module,exports){
module.exports=require(25)
},{"./safe-string":40}],42:[function(require,module,exports){
module.exports=require(26)
},{"../dist/cjs/handlebars":28,"../dist/cjs/handlebars/compiler/printer":36,"../dist/cjs/handlebars/compiler/visitor":37,"fs":27}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvbm9kZV9tb2R1bGVzL2dydW50LWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvYXBwL2pzL2NvbmZpZ3MvbWV0YS5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvYXBwL2pzL2NvbmZpZ3Mvc3R5bGUuanMiLCIvVXNlcnMvam9zZXBoZ3Jvc2VjbG9zZS9zdGF0aWMvZ3Jvb3Z5L2FwcC9qcy9jb250cm9sbGVycy9iYXNlLmpzIiwiL1VzZXJzL2pvc2VwaGdyb3NlY2xvc2Uvc3RhdGljL2dyb292eS9hcHAvanMvZGlyZWN0aXZlcy9iYXNlLmpzIiwiL1VzZXJzL2pvc2VwaGdyb3NlY2xvc2Uvc3RhdGljL2dyb292eS9hcHAvanMvZGlyZWN0aXZlcy9mb290ZXIuanMiLCIvVXNlcnMvam9zZXBoZ3Jvc2VjbG9zZS9zdGF0aWMvZ3Jvb3Z5L2FwcC9qcy9kaXJlY3RpdmVzL2hlYWRlci5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvYXBwL2pzL2luZGV4LmpzIiwiL1VzZXJzL2pvc2VwaGdyb3NlY2xvc2Uvc3RhdGljL2dyb292eS9hcHAvanMvbWlzYy9oZWxwZXJzLmpzIiwiL1VzZXJzL2pvc2VwaGdyb3NlY2xvc2Uvc3RhdGljL2dyb292eS9hcHAvanMvc2VydmljZXMvSGFuZGxlYmFycy5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvYXBwL2pzL3NldHRpbmdzL2NvbmYuanMiLCIvVXNlcnMvam9zZXBoZ3Jvc2VjbG9zZS9zdGF0aWMvZ3Jvb3Z5L2FwcC9qcy90ZW1wbGF0ZXMuanMiLCIvVXNlcnMvam9zZXBoZ3Jvc2VjbG9zZS9zdGF0aWMvZ3Jvb3Z5L25vZGVfbW9kdWxlcy9IYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMuanMiLCIvVXNlcnMvam9zZXBoZ3Jvc2VjbG9zZS9zdGF0aWMvZ3Jvb3Z5L25vZGVfbW9kdWxlcy9IYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMucnVudGltZS5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvbm9kZV9tb2R1bGVzL0hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9iYXNlLmpzIiwiL1VzZXJzL2pvc2VwaGdyb3NlY2xvc2Uvc3RhdGljL2dyb292eS9ub2RlX21vZHVsZXMvSGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2NvbXBpbGVyL2FzdC5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvbm9kZV9tb2R1bGVzL0hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9jb21waWxlci9iYXNlLmpzIiwiL1VzZXJzL2pvc2VwaGdyb3NlY2xvc2Uvc3RhdGljL2dyb292eS9ub2RlX21vZHVsZXMvSGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2NvbXBpbGVyL2NvbXBpbGVyLmpzIiwiL1VzZXJzL2pvc2VwaGdyb3NlY2xvc2Uvc3RhdGljL2dyb292eS9ub2RlX21vZHVsZXMvSGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2NvbXBpbGVyL2phdmFzY3JpcHQtY29tcGlsZXIuanMiLCIvVXNlcnMvam9zZXBoZ3Jvc2VjbG9zZS9zdGF0aWMvZ3Jvb3Z5L25vZGVfbW9kdWxlcy9IYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvY29tcGlsZXIvcGFyc2VyLmpzIiwiL1VzZXJzL2pvc2VwaGdyb3NlY2xvc2Uvc3RhdGljL2dyb292eS9ub2RlX21vZHVsZXMvSGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2NvbXBpbGVyL3ByaW50ZXIuanMiLCIvVXNlcnMvam9zZXBoZ3Jvc2VjbG9zZS9zdGF0aWMvZ3Jvb3Z5L25vZGVfbW9kdWxlcy9IYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvY29tcGlsZXIvdmlzaXRvci5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvbm9kZV9tb2R1bGVzL0hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCIvVXNlcnMvam9zZXBoZ3Jvc2VjbG9zZS9zdGF0aWMvZ3Jvb3Z5L25vZGVfbW9kdWxlcy9IYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvbm9kZV9tb2R1bGVzL0hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvbm9kZV9tb2R1bGVzL0hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy91dGlscy5qcyIsIi9Vc2Vycy9qb3NlcGhncm9zZWNsb3NlL3N0YXRpYy9ncm9vdnkvbm9kZV9tb2R1bGVzL0hhbmRsZWJhcnMvbGliL2luZGV4LmpzIiwiL1VzZXJzL2pvc2VwaGdyb3NlY2xvc2Uvc3RhdGljL2dyb292eS9ub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3NkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3plQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gU08gbWV0YS4uLlxuKGZ1bmN0aW9uKGQsIGEpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgbS5jb25maWcoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaGVhZCA9IGEuZWxlbWVudChkLmhlYWQpLFxuICAgICAgICAgICAgICAgIG1ldGEgPSBhLmVsZW1lbnQoZC5oZWFkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdtZXRhJykpLFxuICAgICAgICAgICAgICAgIG5hbWUgPSAndmlld3BvcnQnLFxuICAgICAgICAgICAgICAgIHZpZXdwb3J0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtZXRhLCBmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgaWYgKHYubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghdmlld3BvcnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmlld01ldGEgPSBkLmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICAgICAgICAgICAgICB2aWV3TWV0YS5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICB2aWV3TWV0YS5jb250ZW50ID0gJ3VzZXItc2NhbGFibGU9bm8sIGluaXRpYWwtc2NhbGU9MSwgbWF4aW11bS1zY2FsZT0xLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21pbmltdW0tc2NhbGU9MSwgd2lkdGg9ZGV2aWNlLXdpZHRoLCBoZWlnaHQ9ZGV2aWNlLScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaGVpZ2h0JztcbiAgICAgICAgICAgICAgICBoZWFkLmFwcGVuZCh2aWV3TWV0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59KShkb2N1bWVudCwgYW5ndWxhcik7XG4iLCIoZnVuY3Rpb24oZCwgYSkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obSkge1xuICAgICAgICBtLmNvbmZpZyhcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnY29uZicsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oY29uZikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAqIFlvdXIgYWxyZWFkeSBpbiB0aGUgc2VydmljZSwgd2hpY2ggbWVhbnMgdGhhdCB3ZSBuZWVkIHRvXG4gICAgICAgICAgICAgICAgICAgICogbWFuYWdlIGF0dGFjaG1lbnQgb2YgdGhlIHJlcXVpcmVkIHN0eWxlc1xuICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGVhZCA9IGEuZWxlbWVudChkLmhlYWQpLFxuICAgICAgICAgICAgICAgICAgICBzY3JpcHRzID0gYS5lbGVtZW50KGQuaGVhZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JykpLFxuICAgICAgICAgICAgICAgICAgICBwYXRoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgcmVsYXRpdmUgcGF0aFxuICAgICAgICAgICAgICAgICAgICBhLmZvckVhY2goc2NyaXB0cywgZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhfnYuc3JjLmluZGV4T2YoJ2FuZ3VsYXJqcy1ncm9vdnknKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGggPSB2LnNyYy5yZXBsYWNlKHYuc3JjLnNwbGl0KCcvJykucG9wKCksICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGEuZm9yRWFjaChjb25mLnJlcXVpcmVkU3R5bGVzLCBmdW5jdGlvbih2KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gY2hlY2sgdG8gc2VlIGlmIHN0eWxlcyBleGlzdCBiZWZvcmUgYXBwZW5kYXRpb24sIG1vdmUgdGhpcyB0byBhIHNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaW5rID0gZC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmsuaHJlZiA9IH52LmluZGV4T2YoJ2h0dHAnKSA/IHYgOiBwYXRoICsgdjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZC5hcHBlbmQobGluayk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgKTtcbiAgICB9O1xufSkoZG9jdW1lbnQsIGFuZ3VsYXIpO1xuIiwiKGZ1bmN0aW9uKGEpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhLm1vZHVsZSgnYW5ndWxhcmpzLWdyb292eScpLmNvbnRyb2xsZXIoXG4gICAgICAgICdiYXNlQ3RybCcsXG4gICAgICAgIFtcbiAgICAgICAgICAgICckcycsXG4gICAgICAgICAgICAnJHNjb3BlJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCRzLCAkc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZ3Jvb3Z5Q29sb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzLmhlYWRlci5jb2xvci5yZXBsYWNlKCcgJywgJy0nKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICApO1xufSkoYW5ndWxhcik7XG4iLCIoZnVuY3Rpb24oYSkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGEubW9kdWxlKCdhbmd1bGFyanMtZ3Jvb3Z5JykuZGlyZWN0aXZlKFxuICAgICAgICAnZ3Jvb3Z5QmFzZScsXG4gICAgICAgIFtcbiAgICAgICAgICAgICckcycsXG4gICAgICAgICAgICAnSGFuZGxlYmFycycsXG4gICAgICAgICAgICBmdW5jdGlvbigkcywgSGFuZGxlYmFycykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnQUVDTScsIC8vIERPIFdIQVQgWU9VIERPISEhXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBIYW5kbGViYXJzLnRlbXBsYXRlcy5iYXNlKCRzKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICApO1xufSkoYW5ndWxhcik7XG4iLCIoZnVuY3Rpb24oYSkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGEubW9kdWxlKCdhbmd1bGFyanMtZ3Jvb3Z5JykuZGlyZWN0aXZlKFxuICAgICAgICAnZ3Jvb3Z5Rm9vdGVyJyxcbiAgICAgICAgW1xuICAgICAgICAgICAgJyRzJyxcbiAgICAgICAgICAgICdIYW5kbGViYXJzJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCRzLCBIYW5kbGViYXJzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IEhhbmRsZWJhcnMudGVtcGxhdGVzLmZvb3RlcigkcylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgKTtcbn0pKGFuZ3VsYXIpO1xuIiwiKGZ1bmN0aW9uKGEpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhLm1vZHVsZSgnYW5ndWxhcmpzLWdyb292eScpLmRpcmVjdGl2ZShcbiAgICAgICAgJ2dyb292eUhlYWRlcicsXG4gICAgICAgIFtcbiAgICAgICAgICAgICckcycsXG4gICAgICAgICAgICAnSGFuZGxlYmFycycsXG4gICAgICAgICAgICBmdW5jdGlvbigkcywgSGFuZGxlYmFycykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBIYW5kbGViYXJzLnRlbXBsYXRlcy5oZWFkZXIoJHMpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICk7XG59KShhbmd1bGFyKTtcbiIsIihmdW5jdGlvbih3LCBkLCBhLCBnKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgcmVxdWlyZSgnLi9zZXR0aW5ncy9jb25mJyk7XG5cbiAgICBpZiAodHlwZW9mIGEgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIHR5cGVvZiBnID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgIC8vIFdoYXQgaXMgdG8gYmUgZG9uZT8gbm8gc2V0dGluZ3MsIG5vIHBsdWdpbiA6YChcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGcgPSB3Lmdyb292eTtcbiAgICBnLm1hc3RlckRldGFpbCA9IGcubUQgfHwgZy5tYXN0ZXJEZXRhaWw7XG4gICAgZy5oZWFkZXIgPSBnLmggfHwgZy5oZWFkZXI7XG5cbiAgICBkZWxldGUgZy5tRDtcbiAgICBkZWxldGUgZy5oO1xuXG4gICAgdmFyIG0gPSBhLm1vZHVsZSgnYW5ndWxhcmpzLWdyb292eScsIFtcbiAgICAgICAgJ2NvbmYnXG4gICAgXSkuY29uc3RhbnQoJyRzJywgZyk7XG5cbiAgICAvLyBDb25maWdzIHRvIGFwcGVuZCBtZXRhL3N0eWxlXG4gICAgcmVxdWlyZSgnLi9jb25maWdzL21ldGEnKShtKTtcbiAgICBpZiAoZy51c2VTdHlsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgcmVxdWlyZSgnLi9jb25maWdzL3N0eWxlJykobSk7XG4gICAgfVxuXG4gICAgLy8gU2VydmljZXNcbiAgICByZXF1aXJlKCcuL3NlcnZpY2VzL0hhbmRsZWJhcnMnKTtcblxuICAgIC8vIENvbnRyb2xsZXJzXG4gICAgcmVxdWlyZSgnLi9jb250cm9sbGVycy9iYXNlJyk7XG5cbiAgICAvLyBEaXJlY3RpdmVzXG4gICAgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Jhc2UnKTtcbiAgICByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvaGVhZGVyJyk7XG4gICAgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL2Zvb3RlcicpO1xuICAgIC8vIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9tYXN0ZXJEZXRhaWwnKTtcblxufSkod2luZG93LCBkb2N1bWVudCwgYW5ndWxhciwgZ3Jvb3Z5IHx8IHdpbmRvdy5ncm9vdnkpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSCkge1xuICAgICAgICBILnJlZ2lzdGVySGVscGVyKCdpZm9yJywgZnVuY3Rpb24odjEsIHYyLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAodjEgfHwgdjIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9ucy5mbih0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG59KSgpO1xuIiwiKGZ1bmN0aW9uKGEpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhLm1vZHVsZSgnYW5ndWxhcmpzLWdyb292eScpLnNlcnZpY2UoXG4gICAgICAgICdIYW5kbGViYXJzJyxcbiAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hhbmRsZWJhcnMnKTtcblxuICAgICAgICAgICAgcmVxdWlyZSgnLi4vdGVtcGxhdGVzJyk7XG4gICAgICAgICAgICByZXF1aXJlKCcuLi9taXNjL2hlbHBlcnMnKShIYW5kbGViYXJzKTtcblxuICAgICAgICAgICAgcmV0dXJuIEhhbmRsZWJhcnM7XG4gICAgICAgIH1cbiAgICApO1xufSkoYW5ndWxhcik7XG4iLCIoZnVuY3Rpb24oYSkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBjb25mID0ge1xuXG4gICAgICAgIC8vIFJlcXVpcmVkIHN0eWxlc2hlZXRzXG4gICAgICAgIHJlcXVpcmVkU3R5bGVzOiBbXG4gICAgICAgICAgICAnaHR0cHM6Ly9yYXdnaXQuY29tL2hvYXJyZC9kcnVua2VuLXBhcnJvdC1mbGF0LXVpLycgK1xuICAgICAgICAgICAgICAgICdtYXN0ZXIvY3NzL2RydW5rZW4tcGFycm90LmNzcycsXG4gICAgICAgICAgICAnYW5ndWxhcmpzLWdyb292eS5jc3MnXG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgYS5tb2R1bGUoJ2NvbmYnLCBbXSkuY29uc3RhbnQoJ2NvbmYnLCBjb25mKTtcblxuICAgIG1vZHVsZS5leHBvcnRzID0gY29uZjtcbn0pKGFuZ3VsYXIpO1xuIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKCdIYW5kbGViYXJzJyk7XG52YXIgdGVtcGxhdGUgPSBIYW5kbGViYXJzLnRlbXBsYXRlLCB0ZW1wbGF0ZXMgPSBIYW5kbGViYXJzLnRlbXBsYXRlcyA9IEhhbmRsZWJhcnMudGVtcGxhdGVzIHx8IHt9O1xudGVtcGxhdGVzWydiYXNlJ10gPSB0ZW1wbGF0ZShmdW5jdGlvbiAoSGFuZGxlYmFycyxkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gIHRoaXMuY29tcGlsZXJJbmZvID0gWzQsJz49IDEuMC4wJ107XG5oZWxwZXJzID0gdGhpcy5tZXJnZShoZWxwZXJzLCBIYW5kbGViYXJzLmhlbHBlcnMpOyBkYXRhID0gZGF0YSB8fCB7fTtcbiAgdmFyIGJ1ZmZlciA9IFwiXCIsIHN0YWNrMSwgc2VsZj10aGlzO1xuXG5mdW5jdGlvbiBwcm9ncmFtMShkZXB0aDAsZGF0YSkge1xuICBcbiAgXG4gIHJldHVybiBcIlxcbiAgICA8Z3Jvb3Z5LWhlYWRlcj48L2dyb292eS1oZWFkZXI+XFxuXCI7XG4gIH1cblxuZnVuY3Rpb24gcHJvZ3JhbTMoZGVwdGgwLGRhdGEpIHtcbiAgXG4gIHZhciBidWZmZXIgPSBcIlwiO1xuICBidWZmZXIgKz0gXCJcXG4gICAgICAgIFxcblwiO1xuICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbmZ1bmN0aW9uIHByb2dyYW01KGRlcHRoMCxkYXRhKSB7XG4gIFxuICBcbiAgcmV0dXJuIFwiXFxuICAgIDxncm9vdnktZm9vdGVyPlxcblwiO1xuICB9XG5cbiAgc3RhY2sxID0gaGVscGVyc1snaWYnXS5jYWxsKGRlcHRoMCwgKGRlcHRoMCAmJiBkZXB0aDAuaGVhZGVyKSwge2hhc2g6e30saW52ZXJzZTpzZWxmLm5vb3AsZm46c2VsZi5wcm9ncmFtKDEsIHByb2dyYW0xLCBkYXRhKSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIlxcblwiO1xuICBzdGFjazEgPSBoZWxwZXJzWydpZiddLmNhbGwoZGVwdGgwLCAoZGVwdGgwICYmIGRlcHRoMC5tYXN0ZXJEZXRhaWwpLCB7aGFzaDp7fSxpbnZlcnNlOnNlbGYucHJvZ3JhbSg1LCBwcm9ncmFtNSwgZGF0YSksZm46c2VsZi5wcm9ncmFtKDMsIHByb2dyYW0zLCBkYXRhKSxkYXRhOmRhdGF9KTtcbiAgaWYoc3RhY2sxIHx8IHN0YWNrMSA9PT0gMCkgeyBidWZmZXIgKz0gc3RhY2sxOyB9XG4gIGJ1ZmZlciArPSBcIlxcblwiO1xuICByZXR1cm4gYnVmZmVyO1xuICB9KTtcblxudGVtcGxhdGVzWydmb290ZXInXSA9IHRlbXBsYXRlKGZ1bmN0aW9uIChIYW5kbGViYXJzLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgdGhpcy5jb21waWxlckluZm8gPSBbNCwnPj0gMS4wLjAnXTtcbmhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIEhhbmRsZWJhcnMuaGVscGVycyk7IGRhdGEgPSBkYXRhIHx8IHt9O1xuICBcblxuXG4gIHJldHVybiBcIjxkaXYgY2xhc3M9J2dyb292eS1mb290ZXInIG5nLWNvbnRyb2xsZXI9J2Jhc2VDdHJsJyBuZy1jbGFzcz0nZ3Jvb3Z5Q29sb3IoKSc+XFxuPC9kaXY+XFxuXCI7XG4gIH0pO1xuXG50ZW1wbGF0ZXNbJ2hlYWRlciddID0gdGVtcGxhdGUoZnVuY3Rpb24gKEhhbmRsZWJhcnMsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICB0aGlzLmNvbXBpbGVySW5mbyA9IFs0LCc+PSAxLjAuMCddO1xuaGVscGVycyA9IHRoaXMubWVyZ2UoaGVscGVycywgSGFuZGxlYmFycy5oZWxwZXJzKTsgZGF0YSA9IGRhdGEgfHwge307XG4gIHZhciBidWZmZXIgPSBcIlwiLCBzdGFjazEsIGZ1bmN0aW9uVHlwZT1cImZ1bmN0aW9uXCIsIGVzY2FwZUV4cHJlc3Npb249dGhpcy5lc2NhcGVFeHByZXNzaW9uO1xuXG5cbiAgYnVmZmVyICs9IFwiPGRpdiBjbGFzcz0nZ3Jvb3Z5LWhlYWRlcicgbmctY29udHJvbGxlcj0nYmFzZUN0cmwnIG5nLWNsYXNzPSdncm9vdnlDb2xvcigpJz5cXG4gICAgPGgxPlwiXG4gICAgKyBlc2NhcGVFeHByZXNzaW9uKCgoc3RhY2sxID0gKChzdGFjazEgPSAoZGVwdGgwICYmIGRlcHRoMC5oZWFkZXIpKSxzdGFjazEgPT0gbnVsbCB8fCBzdGFjazEgPT09IGZhbHNlID8gc3RhY2sxIDogc3RhY2sxLnRpdGxlKSksdHlwZW9mIHN0YWNrMSA9PT0gZnVuY3Rpb25UeXBlID8gc3RhY2sxLmFwcGx5KGRlcHRoMCkgOiBzdGFjazEpKVxuICAgICsgZXNjYXBlRXhwcmVzc2lvbigoKHN0YWNrMSA9ICgoc3RhY2sxID0gKGRlcHRoMCAmJiBkZXB0aDAuaCkpLHN0YWNrMSA9PSBudWxsIHx8IHN0YWNrMSA9PT0gZmFsc2UgPyBzdGFjazEgOiBzdGFjazEudGl0bGUpKSx0eXBlb2Ygc3RhY2sxID09PSBmdW5jdGlvblR5cGUgPyBzdGFjazEuYXBwbHkoZGVwdGgwKSA6IHN0YWNrMSkpXG4gICAgKyBcIjwvaDE+XFxuPC9kaXY+XFxuXCI7XG4gIHJldHVybiBidWZmZXI7XG4gIH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKmdsb2JhbHMgSGFuZGxlYmFyczogdHJ1ZSAqL1xudmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzLnJ1bnRpbWVcIilbXCJkZWZhdWx0XCJdO1xuXG4vLyBDb21waWxlciBpbXBvcnRzXG52YXIgQVNUID0gcmVxdWlyZShcIi4vaGFuZGxlYmFycy9jb21waWxlci9hc3RcIilbXCJkZWZhdWx0XCJdO1xudmFyIFBhcnNlciA9IHJlcXVpcmUoXCIuL2hhbmRsZWJhcnMvY29tcGlsZXIvYmFzZVwiKS5wYXJzZXI7XG52YXIgcGFyc2UgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL2NvbXBpbGVyL2Jhc2VcIikucGFyc2U7XG52YXIgQ29tcGlsZXIgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL2NvbXBpbGVyL2NvbXBpbGVyXCIpLkNvbXBpbGVyO1xudmFyIGNvbXBpbGUgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL2NvbXBpbGVyL2NvbXBpbGVyXCIpLmNvbXBpbGU7XG52YXIgcHJlY29tcGlsZSA9IHJlcXVpcmUoXCIuL2hhbmRsZWJhcnMvY29tcGlsZXIvY29tcGlsZXJcIikucHJlY29tcGlsZTtcbnZhciBKYXZhU2NyaXB0Q29tcGlsZXIgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL2NvbXBpbGVyL2phdmFzY3JpcHQtY29tcGlsZXJcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2NyZWF0ZSA9IEhhbmRsZWJhcnMuY3JlYXRlO1xudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGIgPSBfY3JlYXRlKCk7XG5cbiAgaGIuY29tcGlsZSA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGNvbXBpbGUoaW5wdXQsIG9wdGlvbnMsIGhiKTtcbiAgfTtcbiAgaGIucHJlY29tcGlsZSA9IGZ1bmN0aW9uIChpbnB1dCwgb3B0aW9ucykge1xuICAgIHJldHVybiBwcmVjb21waWxlKGlucHV0LCBvcHRpb25zLCBoYik7XG4gIH07XG5cbiAgaGIuQVNUID0gQVNUO1xuICBoYi5Db21waWxlciA9IENvbXBpbGVyO1xuICBoYi5KYXZhU2NyaXB0Q29tcGlsZXIgPSBKYXZhU2NyaXB0Q29tcGlsZXI7XG4gIGhiLlBhcnNlciA9IFBhcnNlcjtcbiAgaGIucGFyc2UgPSBwYXJzZTtcblxuICByZXR1cm4gaGI7XG59O1xuXG5IYW5kbGViYXJzID0gY3JlYXRlKCk7XG5IYW5kbGViYXJzLmNyZWF0ZSA9IGNyZWF0ZTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBIYW5kbGViYXJzOyIsIlwidXNlIHN0cmljdFwiO1xuLypnbG9iYWxzIEhhbmRsZWJhcnM6IHRydWUgKi9cbnZhciBiYXNlID0gcmVxdWlyZShcIi4vaGFuZGxlYmFycy9iYXNlXCIpO1xuXG4vLyBFYWNoIG9mIHRoZXNlIGF1Z21lbnQgdGhlIEhhbmRsZWJhcnMgb2JqZWN0LiBObyBuZWVkIHRvIHNldHVwIGhlcmUuXG4vLyAoVGhpcyBpcyBkb25lIHRvIGVhc2lseSBzaGFyZSBjb2RlIGJldHdlZW4gY29tbW9uanMgYW5kIGJyb3dzZSBlbnZzKVxudmFyIFNhZmVTdHJpbmcgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nXCIpW1wiZGVmYXVsdFwiXTtcbnZhciBFeGNlcHRpb24gPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL2V4Y2VwdGlvblwiKVtcImRlZmF1bHRcIl07XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3V0aWxzXCIpO1xudmFyIHJ1bnRpbWUgPSByZXF1aXJlKFwiLi9oYW5kbGViYXJzL3J1bnRpbWVcIik7XG5cbi8vIEZvciBjb21wYXRpYmlsaXR5IGFuZCB1c2FnZSBvdXRzaWRlIG9mIG1vZHVsZSBzeXN0ZW1zLCBtYWtlIHRoZSBIYW5kbGViYXJzIG9iamVjdCBhIG5hbWVzcGFjZVxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGIgPSBuZXcgYmFzZS5IYW5kbGViYXJzRW52aXJvbm1lbnQoKTtcblxuICBVdGlscy5leHRlbmQoaGIsIGJhc2UpO1xuICBoYi5TYWZlU3RyaW5nID0gU2FmZVN0cmluZztcbiAgaGIuRXhjZXB0aW9uID0gRXhjZXB0aW9uO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuXG4gIGhiLlZNID0gcnVudGltZTtcbiAgaGIudGVtcGxhdGUgPSBmdW5jdGlvbihzcGVjKSB7XG4gICAgcmV0dXJuIHJ1bnRpbWUudGVtcGxhdGUoc3BlYywgaGIpO1xuICB9O1xuXG4gIHJldHVybiBoYjtcbn07XG5cbnZhciBIYW5kbGViYXJzID0gY3JlYXRlKCk7XG5IYW5kbGViYXJzLmNyZWF0ZSA9IGNyZWF0ZTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBIYW5kbGViYXJzOyIsIlwidXNlIHN0cmljdFwiO1xudmFyIFV0aWxzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG52YXIgRXhjZXB0aW9uID0gcmVxdWlyZShcIi4vZXhjZXB0aW9uXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIFZFUlNJT04gPSBcIjEuMy4wXCI7XG5leHBvcnRzLlZFUlNJT04gPSBWRVJTSU9OO3ZhciBDT01QSUxFUl9SRVZJU0lPTiA9IDQ7XG5leHBvcnRzLkNPTVBJTEVSX1JFVklTSU9OID0gQ09NUElMRVJfUkVWSVNJT047XG52YXIgUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gIDQ6ICc+PSAxLjAuMCdcbn07XG5leHBvcnRzLlJFVklTSU9OX0NIQU5HRVMgPSBSRVZJU0lPTl9DSEFOR0VTO1xudmFyIGlzQXJyYXkgPSBVdGlscy5pc0FycmF5LFxuICAgIGlzRnVuY3Rpb24gPSBVdGlscy5pc0Z1bmN0aW9uLFxuICAgIHRvU3RyaW5nID0gVXRpbHMudG9TdHJpbmcsXG4gICAgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5mdW5jdGlvbiBIYW5kbGViYXJzRW52aXJvbm1lbnQoaGVscGVycywgcGFydGlhbHMpIHtcbiAgdGhpcy5oZWxwZXJzID0gaGVscGVycyB8fCB7fTtcbiAgdGhpcy5wYXJ0aWFscyA9IHBhcnRpYWxzIHx8IHt9O1xuXG4gIHJlZ2lzdGVyRGVmYXVsdEhlbHBlcnModGhpcyk7XG59XG5cbmV4cG9ydHMuSGFuZGxlYmFyc0Vudmlyb25tZW50ID0gSGFuZGxlYmFyc0Vudmlyb25tZW50O0hhbmRsZWJhcnNFbnZpcm9ubWVudC5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBIYW5kbGViYXJzRW52aXJvbm1lbnQsXG5cbiAgbG9nZ2VyOiBsb2dnZXIsXG4gIGxvZzogbG9nLFxuXG4gIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lLCBmbiwgaW52ZXJzZSkge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoaW52ZXJzZSB8fCBmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgVXRpbHMuZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpbnZlcnNlKSB7IGZuLm5vdCA9IGludmVyc2U7IH1cbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcblxuICByZWdpc3RlclBhcnRpYWw6IGZ1bmN0aW9uKG5hbWUsIHN0cikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBVdGlscy5leHRlbmQodGhpcy5wYXJ0aWFscywgIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gc3RyO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0SGVscGVycyhpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGFyZykge1xuICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJNaXNzaW5nIGhlbHBlcjogJ1wiICsgYXJnICsgXCInXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSB8fCBmdW5jdGlvbigpIHt9LCBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoaXNGdW5jdGlvbihjb250ZXh0KSkgeyBjb250ZXh0ID0gY29udGV4dC5jYWxsKHRoaXMpOyB9XG5cbiAgICBpZihjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmKGNvbnRleHQgPT09IGZhbHNlIHx8IGNvbnRleHQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICBpZihjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgZm4gPSBvcHRpb25zLmZuLCBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlO1xuICAgIHZhciBpID0gMCwgcmV0ID0gXCJcIiwgZGF0YTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGlmKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IodmFyIGogPSBjb250ZXh0Lmxlbmd0aDsgaTxqOyBpKyspIHtcbiAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgZGF0YS5pbmRleCA9IGk7XG4gICAgICAgICAgICBkYXRhLmZpcnN0ID0gKGkgPT09IDApO1xuICAgICAgICAgICAgZGF0YS5sYXN0ICA9IChpID09PSAoY29udGV4dC5sZW5ndGgtMSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2ldLCB7IGRhdGE6IGRhdGEgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcih2YXIga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZihjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGlmKGRhdGEpIHsgXG4gICAgICAgICAgICAgIGRhdGEua2V5ID0ga2V5OyBcbiAgICAgICAgICAgICAgZGF0YS5pbmRleCA9IGk7XG4gICAgICAgICAgICAgIGRhdGEuZmlyc3QgPSAoaSA9PT0gMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXQgPSByZXQgKyBmbihjb250ZXh0W2tleV0sIHtkYXRhOiBkYXRhfSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoaSA9PT0gMCl7XG4gICAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBVdGlscy5pc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd3aXRoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmICghVXRpbHMuaXNFbXB0eShjb250ZXh0KSkgcmV0dXJuIG9wdGlvbnMuZm4oY29udGV4dCk7XG4gIH0pO1xuXG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgdmFyIGxldmVsID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsID8gcGFyc2VJbnQob3B0aW9ucy5kYXRhLmxldmVsLCAxMCkgOiAxO1xuICAgIGluc3RhbmNlLmxvZyhsZXZlbCwgY29udGV4dCk7XG4gIH0pO1xufVxuXG52YXIgbG9nZ2VyID0ge1xuICBtZXRob2RNYXA6IHsgMDogJ2RlYnVnJywgMTogJ2luZm8nLCAyOiAnd2FybicsIDM6ICdlcnJvcicgfSxcblxuICAvLyBTdGF0ZSBlbnVtXG4gIERFQlVHOiAwLFxuICBJTkZPOiAxLFxuICBXQVJOOiAyLFxuICBFUlJPUjogMyxcbiAgbGV2ZWw6IDMsXG5cbiAgLy8gY2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgb2JqKSB7XG4gICAgaWYgKGxvZ2dlci5sZXZlbCA8PSBsZXZlbCkge1xuICAgICAgdmFyIG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlW21ldGhvZF0pIHtcbiAgICAgICAgY29uc29sZVttZXRob2RdLmNhbGwoY29uc29sZSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5leHBvcnRzLmxvZ2dlciA9IGxvZ2dlcjtcbmZ1bmN0aW9uIGxvZyhsZXZlbCwgb2JqKSB7IGxvZ2dlci5sb2cobGV2ZWwsIG9iaik7IH1cblxuZXhwb3J0cy5sb2cgPSBsb2c7dmFyIGNyZWF0ZUZyYW1lID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBvYmogPSB7fTtcbiAgVXRpbHMuZXh0ZW5kKG9iaiwgb2JqZWN0KTtcbiAgcmV0dXJuIG9iajtcbn07XG5leHBvcnRzLmNyZWF0ZUZyYW1lID0gY3JlYXRlRnJhbWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRXhjZXB0aW9uID0gcmVxdWlyZShcIi4uL2V4Y2VwdGlvblwiKVtcImRlZmF1bHRcIl07XG5cbmZ1bmN0aW9uIExvY2F0aW9uSW5mbyhsb2NJbmZvKXtcbiAgbG9jSW5mbyA9IGxvY0luZm8gfHwge307XG4gIHRoaXMuZmlyc3RMaW5lICAgPSBsb2NJbmZvLmZpcnN0X2xpbmU7XG4gIHRoaXMuZmlyc3RDb2x1bW4gPSBsb2NJbmZvLmZpcnN0X2NvbHVtbjtcbiAgdGhpcy5sYXN0Q29sdW1uICA9IGxvY0luZm8ubGFzdF9jb2x1bW47XG4gIHRoaXMubGFzdExpbmUgICAgPSBsb2NJbmZvLmxhc3RfbGluZTtcbn1cblxudmFyIEFTVCA9IHtcbiAgUHJvZ3JhbU5vZGU6IGZ1bmN0aW9uKHN0YXRlbWVudHMsIGludmVyc2VTdHJpcCwgaW52ZXJzZSwgbG9jSW5mbykge1xuICAgIHZhciBpbnZlcnNlTG9jYXRpb25JbmZvLCBmaXJzdEludmVyc2VOb2RlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgICBsb2NJbmZvID0gaW52ZXJzZTtcbiAgICAgIGludmVyc2UgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgbG9jSW5mbyA9IGludmVyc2VTdHJpcDtcbiAgICAgIGludmVyc2VTdHJpcCA9IG51bGw7XG4gICAgfVxuXG4gICAgTG9jYXRpb25JbmZvLmNhbGwodGhpcywgbG9jSW5mbyk7XG4gICAgdGhpcy50eXBlID0gXCJwcm9ncmFtXCI7XG4gICAgdGhpcy5zdGF0ZW1lbnRzID0gc3RhdGVtZW50cztcbiAgICB0aGlzLnN0cmlwID0ge307XG5cbiAgICBpZihpbnZlcnNlKSB7XG4gICAgICBmaXJzdEludmVyc2VOb2RlID0gaW52ZXJzZVswXTtcbiAgICAgIGlmIChmaXJzdEludmVyc2VOb2RlKSB7XG4gICAgICAgIGludmVyc2VMb2NhdGlvbkluZm8gPSB7XG4gICAgICAgICAgZmlyc3RfbGluZTogZmlyc3RJbnZlcnNlTm9kZS5maXJzdExpbmUsXG4gICAgICAgICAgbGFzdF9saW5lOiBmaXJzdEludmVyc2VOb2RlLmxhc3RMaW5lLFxuICAgICAgICAgIGxhc3RfY29sdW1uOiBmaXJzdEludmVyc2VOb2RlLmxhc3RDb2x1bW4sXG4gICAgICAgICAgZmlyc3RfY29sdW1uOiBmaXJzdEludmVyc2VOb2RlLmZpcnN0Q29sdW1uXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW52ZXJzZSA9IG5ldyBBU1QuUHJvZ3JhbU5vZGUoaW52ZXJzZSwgaW52ZXJzZVN0cmlwLCBpbnZlcnNlTG9jYXRpb25JbmZvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW52ZXJzZSA9IG5ldyBBU1QuUHJvZ3JhbU5vZGUoaW52ZXJzZSwgaW52ZXJzZVN0cmlwKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RyaXAucmlnaHQgPSBpbnZlcnNlU3RyaXAubGVmdDtcbiAgICB9IGVsc2UgaWYgKGludmVyc2VTdHJpcCkge1xuICAgICAgdGhpcy5zdHJpcC5sZWZ0ID0gaW52ZXJzZVN0cmlwLnJpZ2h0O1xuICAgIH1cbiAgfSxcblxuICBNdXN0YWNoZU5vZGU6IGZ1bmN0aW9uKHJhd1BhcmFtcywgaGFzaCwgb3Blbiwgc3RyaXAsIGxvY0luZm8pIHtcbiAgICBMb2NhdGlvbkluZm8uY2FsbCh0aGlzLCBsb2NJbmZvKTtcbiAgICB0aGlzLnR5cGUgPSBcIm11c3RhY2hlXCI7XG4gICAgdGhpcy5zdHJpcCA9IHN0cmlwO1xuXG4gICAgLy8gT3BlbiBtYXkgYmUgYSBzdHJpbmcgcGFyc2VkIGZyb20gdGhlIHBhcnNlciBvciBhIHBhc3NlZCBib29sZWFuIGZsYWdcbiAgICBpZiAob3BlbiAhPSBudWxsICYmIG9wZW4uY2hhckF0KSB7XG4gICAgICAvLyBNdXN0IHVzZSBjaGFyQXQgdG8gc3VwcG9ydCBJRSBwcmUtMTBcbiAgICAgIHZhciBlc2NhcGVGbGFnID0gb3Blbi5jaGFyQXQoMykgfHwgb3Blbi5jaGFyQXQoMik7XG4gICAgICB0aGlzLmVzY2FwZWQgPSBlc2NhcGVGbGFnICE9PSAneycgJiYgZXNjYXBlRmxhZyAhPT0gJyYnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVzY2FwZWQgPSAhIW9wZW47XG4gICAgfVxuXG4gICAgaWYgKHJhd1BhcmFtcyBpbnN0YW5jZW9mIEFTVC5TZXhwck5vZGUpIHtcbiAgICAgIHRoaXMuc2V4cHIgPSByYXdQYXJhbXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN1cHBvcnQgb2xkIEFTVCBBUElcbiAgICAgIHRoaXMuc2V4cHIgPSBuZXcgQVNULlNleHByTm9kZShyYXdQYXJhbXMsIGhhc2gpO1xuICAgIH1cblxuICAgIHRoaXMuc2V4cHIuaXNSb290ID0gdHJ1ZTtcblxuICAgIC8vIFN1cHBvcnQgb2xkIEFTVCBBUEkgdGhhdCBzdG9yZWQgdGhpcyBpbmZvIGluIE11c3RhY2hlTm9kZVxuICAgIHRoaXMuaWQgPSB0aGlzLnNleHByLmlkO1xuICAgIHRoaXMucGFyYW1zID0gdGhpcy5zZXhwci5wYXJhbXM7XG4gICAgdGhpcy5oYXNoID0gdGhpcy5zZXhwci5oYXNoO1xuICAgIHRoaXMuZWxpZ2libGVIZWxwZXIgPSB0aGlzLnNleHByLmVsaWdpYmxlSGVscGVyO1xuICAgIHRoaXMuaXNIZWxwZXIgPSB0aGlzLnNleHByLmlzSGVscGVyO1xuICB9LFxuXG4gIFNleHByTm9kZTogZnVuY3Rpb24ocmF3UGFyYW1zLCBoYXNoLCBsb2NJbmZvKSB7XG4gICAgTG9jYXRpb25JbmZvLmNhbGwodGhpcywgbG9jSW5mbyk7XG5cbiAgICB0aGlzLnR5cGUgPSBcInNleHByXCI7XG4gICAgdGhpcy5oYXNoID0gaGFzaDtcblxuICAgIHZhciBpZCA9IHRoaXMuaWQgPSByYXdQYXJhbXNbMF07XG4gICAgdmFyIHBhcmFtcyA9IHRoaXMucGFyYW1zID0gcmF3UGFyYW1zLnNsaWNlKDEpO1xuXG4gICAgLy8gYSBtdXN0YWNoZSBpcyBhbiBlbGlnaWJsZSBoZWxwZXIgaWY6XG4gICAgLy8gKiBpdHMgaWQgaXMgc2ltcGxlIChhIHNpbmdsZSBwYXJ0LCBub3QgYHRoaXNgIG9yIGAuLmApXG4gICAgdmFyIGVsaWdpYmxlSGVscGVyID0gdGhpcy5lbGlnaWJsZUhlbHBlciA9IGlkLmlzU2ltcGxlO1xuXG4gICAgLy8gYSBtdXN0YWNoZSBpcyBkZWZpbml0ZWx5IGEgaGVscGVyIGlmOlxuICAgIC8vICogaXQgaXMgYW4gZWxpZ2libGUgaGVscGVyLCBhbmRcbiAgICAvLyAqIGl0IGhhcyBhdCBsZWFzdCBvbmUgcGFyYW1ldGVyIG9yIGhhc2ggc2VnbWVudFxuICAgIHRoaXMuaXNIZWxwZXIgPSBlbGlnaWJsZUhlbHBlciAmJiAocGFyYW1zLmxlbmd0aCB8fCBoYXNoKTtcblxuICAgIC8vIGlmIGEgbXVzdGFjaGUgaXMgYW4gZWxpZ2libGUgaGVscGVyIGJ1dCBub3QgYSBkZWZpbml0ZVxuICAgIC8vIGhlbHBlciwgaXQgaXMgYW1iaWd1b3VzLCBhbmQgd2lsbCBiZSByZXNvbHZlZCBpbiBhIGxhdGVyXG4gICAgLy8gcGFzcyBvciBhdCBydW50aW1lLlxuICB9LFxuXG4gIFBhcnRpYWxOb2RlOiBmdW5jdGlvbihwYXJ0aWFsTmFtZSwgY29udGV4dCwgc3RyaXAsIGxvY0luZm8pIHtcbiAgICBMb2NhdGlvbkluZm8uY2FsbCh0aGlzLCBsb2NJbmZvKTtcbiAgICB0aGlzLnR5cGUgICAgICAgICA9IFwicGFydGlhbFwiO1xuICAgIHRoaXMucGFydGlhbE5hbWUgID0gcGFydGlhbE5hbWU7XG4gICAgdGhpcy5jb250ZXh0ICAgICAgPSBjb250ZXh0O1xuICAgIHRoaXMuc3RyaXAgPSBzdHJpcDtcbiAgfSxcblxuICBCbG9ja05vZGU6IGZ1bmN0aW9uKG11c3RhY2hlLCBwcm9ncmFtLCBpbnZlcnNlLCBjbG9zZSwgbG9jSW5mbykge1xuICAgIExvY2F0aW9uSW5mby5jYWxsKHRoaXMsIGxvY0luZm8pO1xuXG4gICAgaWYobXVzdGFjaGUuc2V4cHIuaWQub3JpZ2luYWwgIT09IGNsb3NlLnBhdGgub3JpZ2luYWwpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24obXVzdGFjaGUuc2V4cHIuaWQub3JpZ2luYWwgKyBcIiBkb2Vzbid0IG1hdGNoIFwiICsgY2xvc2UucGF0aC5vcmlnaW5hbCwgdGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2Jsb2NrJztcbiAgICB0aGlzLm11c3RhY2hlID0gbXVzdGFjaGU7XG4gICAgdGhpcy5wcm9ncmFtICA9IHByb2dyYW07XG4gICAgdGhpcy5pbnZlcnNlICA9IGludmVyc2U7XG5cbiAgICB0aGlzLnN0cmlwID0ge1xuICAgICAgbGVmdDogbXVzdGFjaGUuc3RyaXAubGVmdCxcbiAgICAgIHJpZ2h0OiBjbG9zZS5zdHJpcC5yaWdodFxuICAgIH07XG5cbiAgICAocHJvZ3JhbSB8fCBpbnZlcnNlKS5zdHJpcC5sZWZ0ID0gbXVzdGFjaGUuc3RyaXAucmlnaHQ7XG4gICAgKGludmVyc2UgfHwgcHJvZ3JhbSkuc3RyaXAucmlnaHQgPSBjbG9zZS5zdHJpcC5sZWZ0O1xuXG4gICAgaWYgKGludmVyc2UgJiYgIXByb2dyYW0pIHtcbiAgICAgIHRoaXMuaXNJbnZlcnNlID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG5cbiAgQ29udGVudE5vZGU6IGZ1bmN0aW9uKHN0cmluZywgbG9jSW5mbykge1xuICAgIExvY2F0aW9uSW5mby5jYWxsKHRoaXMsIGxvY0luZm8pO1xuICAgIHRoaXMudHlwZSA9IFwiY29udGVudFwiO1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICB9LFxuXG4gIEhhc2hOb2RlOiBmdW5jdGlvbihwYWlycywgbG9jSW5mbykge1xuICAgIExvY2F0aW9uSW5mby5jYWxsKHRoaXMsIGxvY0luZm8pO1xuICAgIHRoaXMudHlwZSA9IFwiaGFzaFwiO1xuICAgIHRoaXMucGFpcnMgPSBwYWlycztcbiAgfSxcblxuICBJZE5vZGU6IGZ1bmN0aW9uKHBhcnRzLCBsb2NJbmZvKSB7XG4gICAgTG9jYXRpb25JbmZvLmNhbGwodGhpcywgbG9jSW5mbyk7XG4gICAgdGhpcy50eXBlID0gXCJJRFwiO1xuXG4gICAgdmFyIG9yaWdpbmFsID0gXCJcIixcbiAgICAgICAgZGlnID0gW10sXG4gICAgICAgIGRlcHRoID0gMDtcblxuICAgIGZvcih2YXIgaT0wLGw9cGFydHMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXS5wYXJ0O1xuICAgICAgb3JpZ2luYWwgKz0gKHBhcnRzW2ldLnNlcGFyYXRvciB8fCAnJykgKyBwYXJ0O1xuXG4gICAgICBpZiAocGFydCA9PT0gXCIuLlwiIHx8IHBhcnQgPT09IFwiLlwiIHx8IHBhcnQgPT09IFwidGhpc1wiKSB7XG4gICAgICAgIGlmIChkaWcubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJJbnZhbGlkIHBhdGg6IFwiICsgb3JpZ2luYWwsIHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcnQgPT09IFwiLi5cIikge1xuICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc1Njb3BlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpZy5wdXNoKHBhcnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub3JpZ2luYWwgPSBvcmlnaW5hbDtcbiAgICB0aGlzLnBhcnRzICAgID0gZGlnO1xuICAgIHRoaXMuc3RyaW5nICAgPSBkaWcuam9pbignLicpO1xuICAgIHRoaXMuZGVwdGggICAgPSBkZXB0aDtcblxuICAgIC8vIGFuIElEIGlzIHNpbXBsZSBpZiBpdCBvbmx5IGhhcyBvbmUgcGFydCwgYW5kIHRoYXQgcGFydCBpcyBub3RcbiAgICAvLyBgLi5gIG9yIGB0aGlzYC5cbiAgICB0aGlzLmlzU2ltcGxlID0gcGFydHMubGVuZ3RoID09PSAxICYmICF0aGlzLmlzU2NvcGVkICYmIGRlcHRoID09PSAwO1xuXG4gICAgdGhpcy5zdHJpbmdNb2RlVmFsdWUgPSB0aGlzLnN0cmluZztcbiAgfSxcblxuICBQYXJ0aWFsTmFtZU5vZGU6IGZ1bmN0aW9uKG5hbWUsIGxvY0luZm8pIHtcbiAgICBMb2NhdGlvbkluZm8uY2FsbCh0aGlzLCBsb2NJbmZvKTtcbiAgICB0aGlzLnR5cGUgPSBcIlBBUlRJQUxfTkFNRVwiO1xuICAgIHRoaXMubmFtZSA9IG5hbWUub3JpZ2luYWw7XG4gIH0sXG5cbiAgRGF0YU5vZGU6IGZ1bmN0aW9uKGlkLCBsb2NJbmZvKSB7XG4gICAgTG9jYXRpb25JbmZvLmNhbGwodGhpcywgbG9jSW5mbyk7XG4gICAgdGhpcy50eXBlID0gXCJEQVRBXCI7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9LFxuXG4gIFN0cmluZ05vZGU6IGZ1bmN0aW9uKHN0cmluZywgbG9jSW5mbykge1xuICAgIExvY2F0aW9uSW5mby5jYWxsKHRoaXMsIGxvY0luZm8pO1xuICAgIHRoaXMudHlwZSA9IFwiU1RSSU5HXCI7XG4gICAgdGhpcy5vcmlnaW5hbCA9XG4gICAgICB0aGlzLnN0cmluZyA9XG4gICAgICB0aGlzLnN0cmluZ01vZGVWYWx1ZSA9IHN0cmluZztcbiAgfSxcblxuICBJbnRlZ2VyTm9kZTogZnVuY3Rpb24oaW50ZWdlciwgbG9jSW5mbykge1xuICAgIExvY2F0aW9uSW5mby5jYWxsKHRoaXMsIGxvY0luZm8pO1xuICAgIHRoaXMudHlwZSA9IFwiSU5URUdFUlwiO1xuICAgIHRoaXMub3JpZ2luYWwgPVxuICAgICAgdGhpcy5pbnRlZ2VyID0gaW50ZWdlcjtcbiAgICB0aGlzLnN0cmluZ01vZGVWYWx1ZSA9IE51bWJlcihpbnRlZ2VyKTtcbiAgfSxcblxuICBCb29sZWFuTm9kZTogZnVuY3Rpb24oYm9vbCwgbG9jSW5mbykge1xuICAgIExvY2F0aW9uSW5mby5jYWxsKHRoaXMsIGxvY0luZm8pO1xuICAgIHRoaXMudHlwZSA9IFwiQk9PTEVBTlwiO1xuICAgIHRoaXMuYm9vbCA9IGJvb2w7XG4gICAgdGhpcy5zdHJpbmdNb2RlVmFsdWUgPSBib29sID09PSBcInRydWVcIjtcbiAgfSxcblxuICBDb21tZW50Tm9kZTogZnVuY3Rpb24oY29tbWVudCwgbG9jSW5mbykge1xuICAgIExvY2F0aW9uSW5mby5jYWxsKHRoaXMsIGxvY0luZm8pO1xuICAgIHRoaXMudHlwZSA9IFwiY29tbWVudFwiO1xuICAgIHRoaXMuY29tbWVudCA9IGNvbW1lbnQ7XG4gIH1cbn07XG5cbi8vIE11c3QgYmUgZXhwb3J0ZWQgYXMgYW4gb2JqZWN0IHJhdGhlciB0aGFuIHRoZSByb290IG9mIHRoZSBtb2R1bGUgYXMgdGhlIGppc29uIGxleGVyXG4vLyBtb3N0IG1vZGlmeSB0aGUgb2JqZWN0IHRvIG9wZXJhdGUgcHJvcGVybHkuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEFTVDsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBwYXJzZXIgPSByZXF1aXJlKFwiLi9wYXJzZXJcIilbXCJkZWZhdWx0XCJdO1xudmFyIEFTVCA9IHJlcXVpcmUoXCIuL2FzdFwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHMucGFyc2VyID0gcGFyc2VyO1xuXG5mdW5jdGlvbiBwYXJzZShpbnB1dCkge1xuICAvLyBKdXN0IHJldHVybiBpZiBhbiBhbHJlYWR5LWNvbXBpbGUgQVNUIHdhcyBwYXNzZWQgaW4uXG4gIGlmKGlucHV0LmNvbnN0cnVjdG9yID09PSBBU1QuUHJvZ3JhbU5vZGUpIHsgcmV0dXJuIGlucHV0OyB9XG5cbiAgcGFyc2VyLnl5ID0gQVNUO1xuICByZXR1cm4gcGFyc2VyLnBhcnNlKGlucHV0KTtcbn1cblxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlOyIsIlwidXNlIHN0cmljdFwiO1xudmFyIEV4Y2VwdGlvbiA9IHJlcXVpcmUoXCIuLi9leGNlcHRpb25cIilbXCJkZWZhdWx0XCJdO1xuXG5mdW5jdGlvbiBDb21waWxlcigpIHt9XG5cbmV4cG9ydHMuQ29tcGlsZXIgPSBDb21waWxlcjsvLyB0aGUgZm91bmRIZWxwZXIgcmVnaXN0ZXIgd2lsbCBkaXNhbWJpZ3VhdGUgaGVscGVyIGxvb2t1cCBmcm9tIGZpbmRpbmcgYVxuLy8gZnVuY3Rpb24gaW4gYSBjb250ZXh0LiBUaGlzIGlzIG5lY2Vzc2FyeSBmb3IgbXVzdGFjaGUgY29tcGF0aWJpbGl0eSwgd2hpY2hcbi8vIHJlcXVpcmVzIHRoYXQgY29udGV4dCBmdW5jdGlvbnMgaW4gYmxvY2tzIGFyZSBldmFsdWF0ZWQgYnkgYmxvY2tIZWxwZXJNaXNzaW5nLFxuLy8gYW5kIHRoZW4gcHJvY2VlZCBhcyBpZiB0aGUgcmVzdWx0aW5nIHZhbHVlIHdhcyBwcm92aWRlZCB0byBibG9ja0hlbHBlck1pc3NpbmcuXG5cbkNvbXBpbGVyLnByb3RvdHlwZSA9IHtcbiAgY29tcGlsZXI6IENvbXBpbGVyLFxuXG4gIGRpc2Fzc2VtYmxlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3Bjb2RlcyA9IHRoaXMub3Bjb2Rlcywgb3Bjb2RlLCBvdXQgPSBbXSwgcGFyYW1zLCBwYXJhbTtcblxuICAgIGZvciAodmFyIGk9MCwgbD1vcGNvZGVzLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgIG9wY29kZSA9IG9wY29kZXNbaV07XG5cbiAgICAgIGlmIChvcGNvZGUub3Bjb2RlID09PSAnREVDTEFSRScpIHtcbiAgICAgICAgb3V0LnB1c2goXCJERUNMQVJFIFwiICsgb3Bjb2RlLm5hbWUgKyBcIj1cIiArIG9wY29kZS52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaj0wOyBqPG9wY29kZS5hcmdzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgcGFyYW0gPSBvcGNvZGUuYXJnc1tqXTtcbiAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBwYXJhbSA9IFwiXFxcIlwiICsgcGFyYW0ucmVwbGFjZShcIlxcblwiLCBcIlxcXFxuXCIpICsgXCJcXFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmFtcy5wdXNoKHBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICBvdXQucHVzaChvcGNvZGUub3Bjb2RlICsgXCIgXCIgKyBwYXJhbXMuam9pbihcIiBcIikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXQuam9pbihcIlxcblwiKTtcbiAgfSxcblxuICBlcXVhbHM6IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdmFyIGxlbiA9IHRoaXMub3Bjb2Rlcy5sZW5ndGg7XG4gICAgaWYgKG90aGVyLm9wY29kZXMubGVuZ3RoICE9PSBsZW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgb3Bjb2RlID0gdGhpcy5vcGNvZGVzW2ldLFxuICAgICAgICAgIG90aGVyT3Bjb2RlID0gb3RoZXIub3Bjb2Rlc1tpXTtcbiAgICAgIGlmIChvcGNvZGUub3Bjb2RlICE9PSBvdGhlck9wY29kZS5vcGNvZGUgfHwgb3Bjb2RlLmFyZ3MubGVuZ3RoICE9PSBvdGhlck9wY29kZS5hcmdzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9wY29kZS5hcmdzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChvcGNvZGUuYXJnc1tqXSAhPT0gb3RoZXJPcGNvZGUuYXJnc1tqXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxlbiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgIGlmIChvdGhlci5jaGlsZHJlbi5sZW5ndGggIT09IGxlbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5jaGlsZHJlbltpXS5lcXVhbHMob3RoZXIuY2hpbGRyZW5baV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICBndWlkOiAwLFxuXG4gIGNvbXBpbGU6IGZ1bmN0aW9uKHByb2dyYW0sIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wY29kZXMgPSBbXTtcbiAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgdGhpcy5kZXB0aHMgPSB7bGlzdDogW119O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAvLyBUaGVzZSBjaGFuZ2VzIHdpbGwgcHJvcGFnYXRlIHRvIHRoZSBvdGhlciBjb21waWxlciBjb21wb25lbnRzXG4gICAgdmFyIGtub3duSGVscGVycyA9IHRoaXMub3B0aW9ucy5rbm93bkhlbHBlcnM7XG4gICAgdGhpcy5vcHRpb25zLmtub3duSGVscGVycyA9IHtcbiAgICAgICdoZWxwZXJNaXNzaW5nJzogdHJ1ZSxcbiAgICAgICdibG9ja0hlbHBlck1pc3NpbmcnOiB0cnVlLFxuICAgICAgJ2VhY2gnOiB0cnVlLFxuICAgICAgJ2lmJzogdHJ1ZSxcbiAgICAgICd1bmxlc3MnOiB0cnVlLFxuICAgICAgJ3dpdGgnOiB0cnVlLFxuICAgICAgJ2xvZyc6IHRydWVcbiAgICB9O1xuICAgIGlmIChrbm93bkhlbHBlcnMpIHtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4ga25vd25IZWxwZXJzKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5rbm93bkhlbHBlcnNbbmFtZV0gPSBrbm93bkhlbHBlcnNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYWNjZXB0KHByb2dyYW0pO1xuICB9LFxuXG4gIGFjY2VwdDogZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciBzdHJpcCA9IG5vZGUuc3RyaXAgfHwge30sXG4gICAgICAgIHJldDtcbiAgICBpZiAoc3RyaXAubGVmdCkge1xuICAgICAgdGhpcy5vcGNvZGUoJ3N0cmlwJyk7XG4gICAgfVxuXG4gICAgcmV0ID0gdGhpc1tub2RlLnR5cGVdKG5vZGUpO1xuXG4gICAgaWYgKHN0cmlwLnJpZ2h0KSB7XG4gICAgICB0aGlzLm9wY29kZSgnc3RyaXAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIHByb2dyYW06IGZ1bmN0aW9uKHByb2dyYW0pIHtcbiAgICB2YXIgc3RhdGVtZW50cyA9IHByb2dyYW0uc3RhdGVtZW50cztcblxuICAgIGZvcih2YXIgaT0wLCBsPXN0YXRlbWVudHMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgdGhpcy5hY2NlcHQoc3RhdGVtZW50c1tpXSk7XG4gICAgfVxuICAgIHRoaXMuaXNTaW1wbGUgPSBsID09PSAxO1xuXG4gICAgdGhpcy5kZXB0aHMubGlzdCA9IHRoaXMuZGVwdGhzLmxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjb21waWxlUHJvZ3JhbTogZnVuY3Rpb24ocHJvZ3JhbSkge1xuICAgIHZhciByZXN1bHQgPSBuZXcgdGhpcy5jb21waWxlcigpLmNvbXBpbGUocHJvZ3JhbSwgdGhpcy5vcHRpb25zKTtcbiAgICB2YXIgZ3VpZCA9IHRoaXMuZ3VpZCsrLCBkZXB0aDtcblxuICAgIHRoaXMudXNlUGFydGlhbCA9IHRoaXMudXNlUGFydGlhbCB8fCByZXN1bHQudXNlUGFydGlhbDtcblxuICAgIHRoaXMuY2hpbGRyZW5bZ3VpZF0gPSByZXN1bHQ7XG5cbiAgICBmb3IodmFyIGk9MCwgbD1yZXN1bHQuZGVwdGhzLmxpc3QubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgZGVwdGggPSByZXN1bHQuZGVwdGhzLmxpc3RbaV07XG5cbiAgICAgIGlmKGRlcHRoIDwgMikgeyBjb250aW51ZTsgfVxuICAgICAgZWxzZSB7IHRoaXMuYWRkRGVwdGgoZGVwdGggLSAxKTsgfVxuICAgIH1cblxuICAgIHJldHVybiBndWlkO1xuICB9LFxuXG4gIGJsb2NrOiBmdW5jdGlvbihibG9jaykge1xuICAgIHZhciBtdXN0YWNoZSA9IGJsb2NrLm11c3RhY2hlLFxuICAgICAgICBwcm9ncmFtID0gYmxvY2sucHJvZ3JhbSxcbiAgICAgICAgaW52ZXJzZSA9IGJsb2NrLmludmVyc2U7XG5cbiAgICBpZiAocHJvZ3JhbSkge1xuICAgICAgcHJvZ3JhbSA9IHRoaXMuY29tcGlsZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgfVxuXG4gICAgaWYgKGludmVyc2UpIHtcbiAgICAgIGludmVyc2UgPSB0aGlzLmNvbXBpbGVQcm9ncmFtKGludmVyc2UpO1xuICAgIH1cblxuICAgIHZhciBzZXhwciA9IG11c3RhY2hlLnNleHByO1xuICAgIHZhciB0eXBlID0gdGhpcy5jbGFzc2lmeVNleHByKHNleHByKTtcblxuICAgIGlmICh0eXBlID09PSBcImhlbHBlclwiKSB7XG4gICAgICB0aGlzLmhlbHBlclNleHByKHNleHByLCBwcm9ncmFtLCBpbnZlcnNlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwic2ltcGxlXCIpIHtcbiAgICAgIHRoaXMuc2ltcGxlU2V4cHIoc2V4cHIpO1xuXG4gICAgICAvLyBub3cgdGhhdCB0aGUgc2ltcGxlIG11c3RhY2hlIGlzIHJlc29sdmVkLCB3ZSBuZWVkIHRvXG4gICAgICAvLyBldmFsdWF0ZSBpdCBieSBleGVjdXRpbmcgYGJsb2NrSGVscGVyTWlzc2luZ2BcbiAgICAgIHRoaXMub3Bjb2RlKCdwdXNoUHJvZ3JhbScsIHByb2dyYW0pO1xuICAgICAgdGhpcy5vcGNvZGUoJ3B1c2hQcm9ncmFtJywgaW52ZXJzZSk7XG4gICAgICB0aGlzLm9wY29kZSgnZW1wdHlIYXNoJyk7XG4gICAgICB0aGlzLm9wY29kZSgnYmxvY2tWYWx1ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFtYmlndW91c1NleHByKHNleHByLCBwcm9ncmFtLCBpbnZlcnNlKTtcblxuICAgICAgLy8gbm93IHRoYXQgdGhlIHNpbXBsZSBtdXN0YWNoZSBpcyByZXNvbHZlZCwgd2UgbmVlZCB0b1xuICAgICAgLy8gZXZhbHVhdGUgaXQgYnkgZXhlY3V0aW5nIGBibG9ja0hlbHBlck1pc3NpbmdgXG4gICAgICB0aGlzLm9wY29kZSgncHVzaFByb2dyYW0nLCBwcm9ncmFtKTtcbiAgICAgIHRoaXMub3Bjb2RlKCdwdXNoUHJvZ3JhbScsIGludmVyc2UpO1xuICAgICAgdGhpcy5vcGNvZGUoJ2VtcHR5SGFzaCcpO1xuICAgICAgdGhpcy5vcGNvZGUoJ2FtYmlndW91c0Jsb2NrVmFsdWUnKTtcbiAgICB9XG5cbiAgICB0aGlzLm9wY29kZSgnYXBwZW5kJyk7XG4gIH0sXG5cbiAgaGFzaDogZnVuY3Rpb24oaGFzaCkge1xuICAgIHZhciBwYWlycyA9IGhhc2gucGFpcnMsIHBhaXIsIHZhbDtcblxuICAgIHRoaXMub3Bjb2RlKCdwdXNoSGFzaCcpO1xuXG4gICAgZm9yKHZhciBpPTAsIGw9cGFpcnMubGVuZ3RoOyBpPGw7IGkrKykge1xuICAgICAgcGFpciA9IHBhaXJzW2ldO1xuICAgICAgdmFsICA9IHBhaXJbMV07XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc3RyaW5nUGFyYW1zKSB7XG4gICAgICAgIGlmKHZhbC5kZXB0aCkge1xuICAgICAgICAgIHRoaXMuYWRkRGVwdGgodmFsLmRlcHRoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wY29kZSgnZ2V0Q29udGV4dCcsIHZhbC5kZXB0aCB8fCAwKTtcbiAgICAgICAgdGhpcy5vcGNvZGUoJ3B1c2hTdHJpbmdQYXJhbScsIHZhbC5zdHJpbmdNb2RlVmFsdWUsIHZhbC50eXBlKTtcblxuICAgICAgICBpZiAodmFsLnR5cGUgPT09ICdzZXhwcicpIHtcbiAgICAgICAgICAvLyBTdWJleHByZXNzaW9ucyBnZXQgZXZhbHVhdGVkIGFuZCBwYXNzZWQgaW5cbiAgICAgICAgICAvLyBpbiBzdHJpbmcgcGFyYW1zIG1vZGUuXG4gICAgICAgICAgdGhpcy5zZXhwcih2YWwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFjY2VwdCh2YWwpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9wY29kZSgnYXNzaWduVG9IYXNoJywgcGFpclswXSk7XG4gICAgfVxuICAgIHRoaXMub3Bjb2RlKCdwb3BIYXNoJyk7XG4gIH0sXG5cbiAgcGFydGlhbDogZnVuY3Rpb24ocGFydGlhbCkge1xuICAgIHZhciBwYXJ0aWFsTmFtZSA9IHBhcnRpYWwucGFydGlhbE5hbWU7XG4gICAgdGhpcy51c2VQYXJ0aWFsID0gdHJ1ZTtcblxuICAgIGlmKHBhcnRpYWwuY29udGV4dCkge1xuICAgICAgdGhpcy5JRChwYXJ0aWFsLmNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wY29kZSgncHVzaCcsICdkZXB0aDAnKTtcbiAgICB9XG5cbiAgICB0aGlzLm9wY29kZSgnaW52b2tlUGFydGlhbCcsIHBhcnRpYWxOYW1lLm5hbWUpO1xuICAgIHRoaXMub3Bjb2RlKCdhcHBlbmQnKTtcbiAgfSxcblxuICBjb250ZW50OiBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgdGhpcy5vcGNvZGUoJ2FwcGVuZENvbnRlbnQnLCBjb250ZW50LnN0cmluZyk7XG4gIH0sXG5cbiAgbXVzdGFjaGU6IGZ1bmN0aW9uKG11c3RhY2hlKSB7XG4gICAgdGhpcy5zZXhwcihtdXN0YWNoZS5zZXhwcik7XG5cbiAgICBpZihtdXN0YWNoZS5lc2NhcGVkICYmICF0aGlzLm9wdGlvbnMubm9Fc2NhcGUpIHtcbiAgICAgIHRoaXMub3Bjb2RlKCdhcHBlbmRFc2NhcGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3Bjb2RlKCdhcHBlbmQnKTtcbiAgICB9XG4gIH0sXG5cbiAgYW1iaWd1b3VzU2V4cHI6IGZ1bmN0aW9uKHNleHByLCBwcm9ncmFtLCBpbnZlcnNlKSB7XG4gICAgdmFyIGlkID0gc2V4cHIuaWQsXG4gICAgICAgIG5hbWUgPSBpZC5wYXJ0c1swXSxcbiAgICAgICAgaXNCbG9jayA9IHByb2dyYW0gIT0gbnVsbCB8fCBpbnZlcnNlICE9IG51bGw7XG5cbiAgICB0aGlzLm9wY29kZSgnZ2V0Q29udGV4dCcsIGlkLmRlcHRoKTtcblxuICAgIHRoaXMub3Bjb2RlKCdwdXNoUHJvZ3JhbScsIHByb2dyYW0pO1xuICAgIHRoaXMub3Bjb2RlKCdwdXNoUHJvZ3JhbScsIGludmVyc2UpO1xuXG4gICAgdGhpcy5vcGNvZGUoJ2ludm9rZUFtYmlndW91cycsIG5hbWUsIGlzQmxvY2spO1xuICB9LFxuXG4gIHNpbXBsZVNleHByOiBmdW5jdGlvbihzZXhwcikge1xuICAgIHZhciBpZCA9IHNleHByLmlkO1xuXG4gICAgaWYgKGlkLnR5cGUgPT09ICdEQVRBJykge1xuICAgICAgdGhpcy5EQVRBKGlkKTtcbiAgICB9IGVsc2UgaWYgKGlkLnBhcnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5JRChpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNpbXBsaWZpZWQgSUQgZm9yIGB0aGlzYFxuICAgICAgdGhpcy5hZGREZXB0aChpZC5kZXB0aCk7XG4gICAgICB0aGlzLm9wY29kZSgnZ2V0Q29udGV4dCcsIGlkLmRlcHRoKTtcbiAgICAgIHRoaXMub3Bjb2RlKCdwdXNoQ29udGV4dCcpO1xuICAgIH1cblxuICAgIHRoaXMub3Bjb2RlKCdyZXNvbHZlUG9zc2libGVMYW1iZGEnKTtcbiAgfSxcblxuICBoZWxwZXJTZXhwcjogZnVuY3Rpb24oc2V4cHIsIHByb2dyYW0sIGludmVyc2UpIHtcbiAgICB2YXIgcGFyYW1zID0gdGhpcy5zZXR1cEZ1bGxNdXN0YWNoZVBhcmFtcyhzZXhwciwgcHJvZ3JhbSwgaW52ZXJzZSksXG4gICAgICAgIG5hbWUgPSBzZXhwci5pZC5wYXJ0c1swXTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMua25vd25IZWxwZXJzW25hbWVdKSB7XG4gICAgICB0aGlzLm9wY29kZSgnaW52b2tlS25vd25IZWxwZXInLCBwYXJhbXMubGVuZ3RoLCBuYW1lKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5rbm93bkhlbHBlcnNPbmx5KSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiWW91IHNwZWNpZmllZCBrbm93bkhlbHBlcnNPbmx5LCBidXQgdXNlZCB0aGUgdW5rbm93biBoZWxwZXIgXCIgKyBuYW1lLCBzZXhwcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3Bjb2RlKCdpbnZva2VIZWxwZXInLCBwYXJhbXMubGVuZ3RoLCBuYW1lLCBzZXhwci5pc1Jvb3QpO1xuICAgIH1cbiAgfSxcblxuICBzZXhwcjogZnVuY3Rpb24oc2V4cHIpIHtcbiAgICB2YXIgdHlwZSA9IHRoaXMuY2xhc3NpZnlTZXhwcihzZXhwcik7XG5cbiAgICBpZiAodHlwZSA9PT0gXCJzaW1wbGVcIikge1xuICAgICAgdGhpcy5zaW1wbGVTZXhwcihzZXhwcik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImhlbHBlclwiKSB7XG4gICAgICB0aGlzLmhlbHBlclNleHByKHNleHByKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hbWJpZ3VvdXNTZXhwcihzZXhwcik7XG4gICAgfVxuICB9LFxuXG4gIElEOiBmdW5jdGlvbihpZCkge1xuICAgIHRoaXMuYWRkRGVwdGgoaWQuZGVwdGgpO1xuICAgIHRoaXMub3Bjb2RlKCdnZXRDb250ZXh0JywgaWQuZGVwdGgpO1xuXG4gICAgdmFyIG5hbWUgPSBpZC5wYXJ0c1swXTtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRoaXMub3Bjb2RlKCdwdXNoQ29udGV4dCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wY29kZSgnbG9va3VwT25Db250ZXh0JywgaWQucGFydHNbMF0pO1xuICAgIH1cblxuICAgIGZvcih2YXIgaT0xLCBsPWlkLnBhcnRzLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgIHRoaXMub3Bjb2RlKCdsb29rdXAnLCBpZC5wYXJ0c1tpXSk7XG4gICAgfVxuICB9LFxuXG4gIERBVEE6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB0aGlzLm9wdGlvbnMuZGF0YSA9IHRydWU7XG4gICAgaWYgKGRhdGEuaWQuaXNTY29wZWQgfHwgZGF0YS5pZC5kZXB0aCkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignU2NvcGVkIGRhdGEgcmVmZXJlbmNlcyBhcmUgbm90IHN1cHBvcnRlZDogJyArIGRhdGEub3JpZ2luYWwsIGRhdGEpO1xuICAgIH1cblxuICAgIHRoaXMub3Bjb2RlKCdsb29rdXBEYXRhJyk7XG4gICAgdmFyIHBhcnRzID0gZGF0YS5pZC5wYXJ0cztcbiAgICBmb3IodmFyIGk9MCwgbD1wYXJ0cy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICB0aGlzLm9wY29kZSgnbG9va3VwJywgcGFydHNbaV0pO1xuICAgIH1cbiAgfSxcblxuICBTVFJJTkc6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHRoaXMub3Bjb2RlKCdwdXNoU3RyaW5nJywgc3RyaW5nLnN0cmluZyk7XG4gIH0sXG5cbiAgSU5URUdFUjogZnVuY3Rpb24oaW50ZWdlcikge1xuICAgIHRoaXMub3Bjb2RlKCdwdXNoTGl0ZXJhbCcsIGludGVnZXIuaW50ZWdlcik7XG4gIH0sXG5cbiAgQk9PTEVBTjogZnVuY3Rpb24oYm9vbCkge1xuICAgIHRoaXMub3Bjb2RlKCdwdXNoTGl0ZXJhbCcsIGJvb2wuYm9vbCk7XG4gIH0sXG5cbiAgY29tbWVudDogZnVuY3Rpb24oKSB7fSxcblxuICAvLyBIRUxQRVJTXG4gIG9wY29kZTogZnVuY3Rpb24obmFtZSkge1xuICAgIHRoaXMub3Bjb2Rlcy5wdXNoKHsgb3Bjb2RlOiBuYW1lLCBhcmdzOiBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgfSk7XG4gIH0sXG5cbiAgZGVjbGFyZTogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm9wY29kZXMucHVzaCh7IG9wY29kZTogJ0RFQ0xBUkUnLCBuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWUgfSk7XG4gIH0sXG5cbiAgYWRkRGVwdGg6IGZ1bmN0aW9uKGRlcHRoKSB7XG4gICAgaWYoZGVwdGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICBpZighdGhpcy5kZXB0aHNbZGVwdGhdKSB7XG4gICAgICB0aGlzLmRlcHRoc1tkZXB0aF0gPSB0cnVlO1xuICAgICAgdGhpcy5kZXB0aHMubGlzdC5wdXNoKGRlcHRoKTtcbiAgICB9XG4gIH0sXG5cbiAgY2xhc3NpZnlTZXhwcjogZnVuY3Rpb24oc2V4cHIpIHtcbiAgICB2YXIgaXNIZWxwZXIgICA9IHNleHByLmlzSGVscGVyO1xuICAgIHZhciBpc0VsaWdpYmxlID0gc2V4cHIuZWxpZ2libGVIZWxwZXI7XG4gICAgdmFyIG9wdGlvbnMgICAgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICAvLyBpZiBhbWJpZ3VvdXMsIHdlIGNhbiBwb3NzaWJseSByZXNvbHZlIHRoZSBhbWJpZ3VpdHkgbm93XG4gICAgaWYgKGlzRWxpZ2libGUgJiYgIWlzSGVscGVyKSB7XG4gICAgICB2YXIgbmFtZSA9IHNleHByLmlkLnBhcnRzWzBdO1xuXG4gICAgICBpZiAob3B0aW9ucy5rbm93bkhlbHBlcnNbbmFtZV0pIHtcbiAgICAgICAgaXNIZWxwZXIgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmtub3duSGVscGVyc09ubHkpIHtcbiAgICAgICAgaXNFbGlnaWJsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0hlbHBlcikgeyByZXR1cm4gXCJoZWxwZXJcIjsgfVxuICAgIGVsc2UgaWYgKGlzRWxpZ2libGUpIHsgcmV0dXJuIFwiYW1iaWd1b3VzXCI7IH1cbiAgICBlbHNlIHsgcmV0dXJuIFwic2ltcGxlXCI7IH1cbiAgfSxcblxuICBwdXNoUGFyYW1zOiBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgaSA9IHBhcmFtcy5sZW5ndGgsIHBhcmFtO1xuXG4gICAgd2hpbGUoaS0tKSB7XG4gICAgICBwYXJhbSA9IHBhcmFtc1tpXTtcblxuICAgICAgaWYodGhpcy5vcHRpb25zLnN0cmluZ1BhcmFtcykge1xuICAgICAgICBpZihwYXJhbS5kZXB0aCkge1xuICAgICAgICAgIHRoaXMuYWRkRGVwdGgocGFyYW0uZGVwdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcGNvZGUoJ2dldENvbnRleHQnLCBwYXJhbS5kZXB0aCB8fCAwKTtcbiAgICAgICAgdGhpcy5vcGNvZGUoJ3B1c2hTdHJpbmdQYXJhbScsIHBhcmFtLnN0cmluZ01vZGVWYWx1ZSwgcGFyYW0udHlwZSk7XG5cbiAgICAgICAgaWYgKHBhcmFtLnR5cGUgPT09ICdzZXhwcicpIHtcbiAgICAgICAgICAvLyBTdWJleHByZXNzaW9ucyBnZXQgZXZhbHVhdGVkIGFuZCBwYXNzZWQgaW5cbiAgICAgICAgICAvLyBpbiBzdHJpbmcgcGFyYW1zIG1vZGUuXG4gICAgICAgICAgdGhpcy5zZXhwcihwYXJhbSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNbcGFyYW0udHlwZV0ocGFyYW0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzZXR1cEZ1bGxNdXN0YWNoZVBhcmFtczogZnVuY3Rpb24oc2V4cHIsIHByb2dyYW0sIGludmVyc2UpIHtcbiAgICB2YXIgcGFyYW1zID0gc2V4cHIucGFyYW1zO1xuICAgIHRoaXMucHVzaFBhcmFtcyhwYXJhbXMpO1xuXG4gICAgdGhpcy5vcGNvZGUoJ3B1c2hQcm9ncmFtJywgcHJvZ3JhbSk7XG4gICAgdGhpcy5vcGNvZGUoJ3B1c2hQcm9ncmFtJywgaW52ZXJzZSk7XG5cbiAgICBpZiAoc2V4cHIuaGFzaCkge1xuICAgICAgdGhpcy5oYXNoKHNleHByLmhhc2gpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wY29kZSgnZW1wdHlIYXNoJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxufTtcblxuZnVuY3Rpb24gcHJlY29tcGlsZShpbnB1dCwgb3B0aW9ucywgZW52KSB7XG4gIGlmIChpbnB1dCA9PSBudWxsIHx8ICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnICYmIGlucHV0LmNvbnN0cnVjdG9yICE9PSBlbnYuQVNULlByb2dyYW1Ob2RlKSkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJZb3UgbXVzdCBwYXNzIGEgc3RyaW5nIG9yIEhhbmRsZWJhcnMgQVNUIHRvIEhhbmRsZWJhcnMucHJlY29tcGlsZS4gWW91IHBhc3NlZCBcIiArIGlucHV0KTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBpZiAoISgnZGF0YScgaW4gb3B0aW9ucykpIHtcbiAgICBvcHRpb25zLmRhdGEgPSB0cnVlO1xuICB9XG5cbiAgdmFyIGFzdCA9IGVudi5wYXJzZShpbnB1dCk7XG4gIHZhciBlbnZpcm9ubWVudCA9IG5ldyBlbnYuQ29tcGlsZXIoKS5jb21waWxlKGFzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBuZXcgZW52LkphdmFTY3JpcHRDb21waWxlcigpLmNvbXBpbGUoZW52aXJvbm1lbnQsIG9wdGlvbnMpO1xufVxuXG5leHBvcnRzLnByZWNvbXBpbGUgPSBwcmVjb21waWxlO2Z1bmN0aW9uIGNvbXBpbGUoaW5wdXQsIG9wdGlvbnMsIGVudikge1xuICBpZiAoaW5wdXQgPT0gbnVsbCB8fCAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJyAmJiBpbnB1dC5jb25zdHJ1Y3RvciAhPT0gZW52LkFTVC5Qcm9ncmFtTm9kZSkpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiWW91IG11c3QgcGFzcyBhIHN0cmluZyBvciBIYW5kbGViYXJzIEFTVCB0byBIYW5kbGViYXJzLmNvbXBpbGUuIFlvdSBwYXNzZWQgXCIgKyBpbnB1dCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAoISgnZGF0YScgaW4gb3B0aW9ucykpIHtcbiAgICBvcHRpb25zLmRhdGEgPSB0cnVlO1xuICB9XG5cbiAgdmFyIGNvbXBpbGVkO1xuXG4gIGZ1bmN0aW9uIGNvbXBpbGVJbnB1dCgpIHtcbiAgICB2YXIgYXN0ID0gZW52LnBhcnNlKGlucHV0KTtcbiAgICB2YXIgZW52aXJvbm1lbnQgPSBuZXcgZW52LkNvbXBpbGVyKCkuY29tcGlsZShhc3QsIG9wdGlvbnMpO1xuICAgIHZhciB0ZW1wbGF0ZVNwZWMgPSBuZXcgZW52LkphdmFTY3JpcHRDb21waWxlcigpLmNvbXBpbGUoZW52aXJvbm1lbnQsIG9wdGlvbnMsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgcmV0dXJuIGVudi50ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgLy8gVGVtcGxhdGUgaXMgb25seSBjb21waWxlZCBvbiBmaXJzdCB1c2UgYW5kIGNhY2hlZCBhZnRlciB0aGF0IHBvaW50LlxuICByZXR1cm4gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmICghY29tcGlsZWQpIHtcbiAgICAgIGNvbXBpbGVkID0gY29tcGlsZUlucHV0KCk7XG4gICAgfVxuICAgIHJldHVybiBjb21waWxlZC5jYWxsKHRoaXMsIGNvbnRleHQsIG9wdGlvbnMpO1xuICB9O1xufVxuXG5leHBvcnRzLmNvbXBpbGUgPSBjb21waWxlOyIsIlwidXNlIHN0cmljdFwiO1xudmFyIENPTVBJTEVSX1JFVklTSU9OID0gcmVxdWlyZShcIi4uL2Jhc2VcIikuQ09NUElMRVJfUkVWSVNJT047XG52YXIgUkVWSVNJT05fQ0hBTkdFUyA9IHJlcXVpcmUoXCIuLi9iYXNlXCIpLlJFVklTSU9OX0NIQU5HRVM7XG52YXIgbG9nID0gcmVxdWlyZShcIi4uL2Jhc2VcIikubG9nO1xudmFyIEV4Y2VwdGlvbiA9IHJlcXVpcmUoXCIuLi9leGNlcHRpb25cIilbXCJkZWZhdWx0XCJdO1xuXG5mdW5jdGlvbiBMaXRlcmFsKHZhbHVlKSB7XG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gSmF2YVNjcmlwdENvbXBpbGVyKCkge31cblxuSmF2YVNjcmlwdENvbXBpbGVyLnByb3RvdHlwZSA9IHtcbiAgLy8gUFVCTElDIEFQSTogWW91IGNhbiBvdmVycmlkZSB0aGVzZSBtZXRob2RzIGluIGEgc3ViY2xhc3MgdG8gcHJvdmlkZVxuICAvLyBhbHRlcm5hdGl2ZSBjb21waWxlZCBmb3JtcyBmb3IgbmFtZSBsb29rdXAgYW5kIGJ1ZmZlcmluZyBzZW1hbnRpY3NcbiAgbmFtZUxvb2t1cDogZnVuY3Rpb24ocGFyZW50LCBuYW1lIC8qICwgdHlwZSovKSB7XG4gICAgdmFyIHdyYXAsXG4gICAgICAgIHJldDtcbiAgICBpZiAocGFyZW50LmluZGV4T2YoJ2RlcHRoJykgPT09IDApIHtcbiAgICAgIHdyYXAgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICgvXlswLTldKyQvLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldCA9IHBhcmVudCArIFwiW1wiICsgbmFtZSArIFwiXVwiO1xuICAgIH0gZWxzZSBpZiAoSmF2YVNjcmlwdENvbXBpbGVyLmlzVmFsaWRKYXZhU2NyaXB0VmFyaWFibGVOYW1lKG5hbWUpKSB7XG4gICAgICByZXQgPSBwYXJlbnQgKyBcIi5cIiArIG5hbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0ID0gcGFyZW50ICsgXCJbJ1wiICsgbmFtZSArIFwiJ11cIjtcbiAgICB9XG5cbiAgICBpZiAod3JhcCkge1xuICAgICAgcmV0dXJuICcoJyArIHBhcmVudCArICcgJiYgJyArIHJldCArICcpJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH0sXG5cbiAgY29tcGlsZXJJbmZvOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTixcbiAgICAgICAgdmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW3JldmlzaW9uXTtcbiAgICByZXR1cm4gXCJ0aGlzLmNvbXBpbGVySW5mbyA9IFtcIityZXZpc2lvbitcIiwnXCIrdmVyc2lvbnMrXCInXTtcXG5cIjtcbiAgfSxcblxuICBhcHBlbmRUb0J1ZmZlcjogZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZW52aXJvbm1lbnQuaXNTaW1wbGUpIHtcbiAgICAgIHJldHVybiBcInJldHVybiBcIiArIHN0cmluZyArIFwiO1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhcHBlbmRUb0J1ZmZlcjogdHJ1ZSxcbiAgICAgICAgY29udGVudDogc3RyaW5nLFxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7IHJldHVybiBcImJ1ZmZlciArPSBcIiArIHN0cmluZyArIFwiO1wiOyB9XG4gICAgICB9O1xuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplQnVmZmVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdW90ZWRTdHJpbmcoXCJcIik7XG4gIH0sXG5cbiAgbmFtZXNwYWNlOiBcIkhhbmRsZWJhcnNcIixcbiAgLy8gRU5EIFBVQkxJQyBBUElcblxuICBjb21waWxlOiBmdW5jdGlvbihlbnZpcm9ubWVudCwgb3B0aW9ucywgY29udGV4dCwgYXNPYmplY3QpIHtcbiAgICB0aGlzLmVudmlyb25tZW50ID0gZW52aXJvbm1lbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGxvZygnZGVidWcnLCB0aGlzLmVudmlyb25tZW50LmRpc2Fzc2VtYmxlKCkgKyBcIlxcblxcblwiKTtcblxuICAgIHRoaXMubmFtZSA9IHRoaXMuZW52aXJvbm1lbnQubmFtZTtcbiAgICB0aGlzLmlzQ2hpbGQgPSAhIWNvbnRleHQ7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dCB8fCB7XG4gICAgICBwcm9ncmFtczogW10sXG4gICAgICBlbnZpcm9ubWVudHM6IFtdLFxuICAgICAgYWxpYXNlczogeyB9XG4gICAgfTtcblxuICAgIHRoaXMucHJlYW1ibGUoKTtcblxuICAgIHRoaXMuc3RhY2tTbG90ID0gMDtcbiAgICB0aGlzLnN0YWNrVmFycyA9IFtdO1xuICAgIHRoaXMucmVnaXN0ZXJzID0geyBsaXN0OiBbXSB9O1xuICAgIHRoaXMuaGFzaGVzID0gW107XG4gICAgdGhpcy5jb21waWxlU3RhY2sgPSBbXTtcbiAgICB0aGlzLmlubGluZVN0YWNrID0gW107XG5cbiAgICB0aGlzLmNvbXBpbGVDaGlsZHJlbihlbnZpcm9ubWVudCwgb3B0aW9ucyk7XG5cbiAgICB2YXIgb3Bjb2RlcyA9IGVudmlyb25tZW50Lm9wY29kZXMsIG9wY29kZTtcblxuICAgIHRoaXMuaSA9IDA7XG5cbiAgICBmb3IodmFyIGw9b3Bjb2Rlcy5sZW5ndGg7IHRoaXMuaTxsOyB0aGlzLmkrKykge1xuICAgICAgb3Bjb2RlID0gb3Bjb2Rlc1t0aGlzLmldO1xuXG4gICAgICBpZihvcGNvZGUub3Bjb2RlID09PSAnREVDTEFSRScpIHtcbiAgICAgICAgdGhpc1tvcGNvZGUubmFtZV0gPSBvcGNvZGUudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzW29wY29kZS5vcGNvZGVdLmFwcGx5KHRoaXMsIG9wY29kZS5hcmdzKTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzZXQgdGhlIHN0cmlwTmV4dCBmbGFnIGlmIGl0IHdhcyBub3Qgc2V0IGJ5IHRoaXMgb3BlcmF0aW9uLlxuICAgICAgaWYgKG9wY29kZS5vcGNvZGUgIT09IHRoaXMuc3RyaXBOZXh0KSB7XG4gICAgICAgIHRoaXMuc3RyaXBOZXh0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmx1c2ggYW55IHRyYWlsaW5nIGNvbnRlbnQgdGhhdCBtaWdodCBiZSBwZW5kaW5nLlxuICAgIHRoaXMucHVzaFNvdXJjZSgnJyk7XG5cbiAgICBpZiAodGhpcy5zdGFja1Nsb3QgfHwgdGhpcy5pbmxpbmVTdGFjay5sZW5ndGggfHwgdGhpcy5jb21waWxlU3RhY2subGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdDb21waWxlIGNvbXBsZXRlZCB3aXRoIGNvbnRlbnQgbGVmdCBvbiBzdGFjaycpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUZ1bmN0aW9uQ29udGV4dChhc09iamVjdCk7XG4gIH0sXG5cbiAgcHJlYW1ibGU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXQgPSBbXTtcblxuICAgIGlmICghdGhpcy5pc0NoaWxkKSB7XG4gICAgICB2YXIgbmFtZXNwYWNlID0gdGhpcy5uYW1lc3BhY2U7XG5cbiAgICAgIHZhciBjb3BpZXMgPSBcImhlbHBlcnMgPSB0aGlzLm1lcmdlKGhlbHBlcnMsIFwiICsgbmFtZXNwYWNlICsgXCIuaGVscGVycyk7XCI7XG4gICAgICBpZiAodGhpcy5lbnZpcm9ubWVudC51c2VQYXJ0aWFsKSB7IGNvcGllcyA9IGNvcGllcyArIFwiIHBhcnRpYWxzID0gdGhpcy5tZXJnZShwYXJ0aWFscywgXCIgKyBuYW1lc3BhY2UgKyBcIi5wYXJ0aWFscyk7XCI7IH1cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGF0YSkgeyBjb3BpZXMgPSBjb3BpZXMgKyBcIiBkYXRhID0gZGF0YSB8fCB7fTtcIjsgfVxuICAgICAgb3V0LnB1c2goY29waWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0LnB1c2goJycpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5lbnZpcm9ubWVudC5pc1NpbXBsZSkge1xuICAgICAgb3V0LnB1c2goXCIsIGJ1ZmZlciA9IFwiICsgdGhpcy5pbml0aWFsaXplQnVmZmVyKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQucHVzaChcIlwiKTtcbiAgICB9XG5cbiAgICAvLyB0cmFjayB0aGUgbGFzdCBjb250ZXh0IHB1c2hlZCBpbnRvIHBsYWNlIHRvIGFsbG93IHNraXBwaW5nIHRoZVxuICAgIC8vIGdldENvbnRleHQgb3Bjb2RlIHdoZW4gaXQgd291bGQgYmUgYSBub29wXG4gICAgdGhpcy5sYXN0Q29udGV4dCA9IDA7XG4gICAgdGhpcy5zb3VyY2UgPSBvdXQ7XG4gIH0sXG5cbiAgY3JlYXRlRnVuY3Rpb25Db250ZXh0OiBmdW5jdGlvbihhc09iamVjdCkge1xuICAgIHZhciBsb2NhbHMgPSB0aGlzLnN0YWNrVmFycy5jb25jYXQodGhpcy5yZWdpc3RlcnMubGlzdCk7XG5cbiAgICBpZihsb2NhbHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zb3VyY2VbMV0gPSB0aGlzLnNvdXJjZVsxXSArIFwiLCBcIiArIGxvY2Fscy5qb2luKFwiLCBcIik7XG4gICAgfVxuXG4gICAgLy8gR2VuZXJhdGUgbWluaW1pemVyIGFsaWFzIG1hcHBpbmdzXG4gICAgaWYgKCF0aGlzLmlzQ2hpbGQpIHtcbiAgICAgIGZvciAodmFyIGFsaWFzIGluIHRoaXMuY29udGV4dC5hbGlhc2VzKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQuYWxpYXNlcy5oYXNPd25Qcm9wZXJ0eShhbGlhcykpIHtcbiAgICAgICAgICB0aGlzLnNvdXJjZVsxXSA9IHRoaXMuc291cmNlWzFdICsgJywgJyArIGFsaWFzICsgJz0nICsgdGhpcy5jb250ZXh0LmFsaWFzZXNbYWxpYXNdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc291cmNlWzFdKSB7XG4gICAgICB0aGlzLnNvdXJjZVsxXSA9IFwidmFyIFwiICsgdGhpcy5zb3VyY2VbMV0uc3Vic3RyaW5nKDIpICsgXCI7XCI7XG4gICAgfVxuXG4gICAgLy8gTWVyZ2UgY2hpbGRyZW5cbiAgICBpZiAoIXRoaXMuaXNDaGlsZCkge1xuICAgICAgdGhpcy5zb3VyY2VbMV0gKz0gJ1xcbicgKyB0aGlzLmNvbnRleHQucHJvZ3JhbXMuam9pbignXFxuJykgKyAnXFxuJztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZW52aXJvbm1lbnQuaXNTaW1wbGUpIHtcbiAgICAgIHRoaXMucHVzaFNvdXJjZShcInJldHVybiBidWZmZXI7XCIpO1xuICAgIH1cblxuICAgIHZhciBwYXJhbXMgPSB0aGlzLmlzQ2hpbGQgPyBbXCJkZXB0aDBcIiwgXCJkYXRhXCJdIDogW1wiSGFuZGxlYmFyc1wiLCBcImRlcHRoMFwiLCBcImhlbHBlcnNcIiwgXCJwYXJ0aWFsc1wiLCBcImRhdGFcIl07XG5cbiAgICBmb3IodmFyIGk9MCwgbD10aGlzLmVudmlyb25tZW50LmRlcHRocy5saXN0Lmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgIHBhcmFtcy5wdXNoKFwiZGVwdGhcIiArIHRoaXMuZW52aXJvbm1lbnQuZGVwdGhzLmxpc3RbaV0pO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm0gYSBzZWNvbmQgcGFzcyBvdmVyIHRoZSBvdXRwdXQgdG8gbWVyZ2UgY29udGVudCB3aGVuIHBvc3NpYmxlXG4gICAgdmFyIHNvdXJjZSA9IHRoaXMubWVyZ2VTb3VyY2UoKTtcblxuICAgIGlmICghdGhpcy5pc0NoaWxkKSB7XG4gICAgICBzb3VyY2UgPSB0aGlzLmNvbXBpbGVySW5mbygpK3NvdXJjZTtcbiAgICB9XG5cbiAgICBpZiAoYXNPYmplY3QpIHtcbiAgICAgIHBhcmFtcy5wdXNoKHNvdXJjZSk7XG5cbiAgICAgIHJldHVybiBGdW5jdGlvbi5hcHBseSh0aGlzLCBwYXJhbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZnVuY3Rpb25Tb3VyY2UgPSAnZnVuY3Rpb24gJyArICh0aGlzLm5hbWUgfHwgJycpICsgJygnICsgcGFyYW1zLmpvaW4oJywnKSArICcpIHtcXG4gICcgKyBzb3VyY2UgKyAnfSc7XG4gICAgICBsb2coJ2RlYnVnJywgZnVuY3Rpb25Tb3VyY2UgKyBcIlxcblxcblwiKTtcbiAgICAgIHJldHVybiBmdW5jdGlvblNvdXJjZTtcbiAgICB9XG4gIH0sXG4gIG1lcmdlU291cmNlOiBmdW5jdGlvbigpIHtcbiAgICAvLyBXQVJOOiBXZSBhcmUgbm90IGhhbmRsaW5nIHRoZSBjYXNlIHdoZXJlIGJ1ZmZlciBpcyBzdGlsbCBwb3B1bGF0ZWQgYXMgdGhlIHNvdXJjZSBzaG91bGRcbiAgICAvLyBub3QgaGF2ZSBidWZmZXIgYXBwZW5kIG9wZXJhdGlvbnMgYXMgdGhlaXIgZmluYWwgYWN0aW9uLlxuICAgIHZhciBzb3VyY2UgPSAnJyxcbiAgICAgICAgYnVmZmVyO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLnNvdXJjZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIGxpbmUgPSB0aGlzLnNvdXJjZVtpXTtcbiAgICAgIGlmIChsaW5lLmFwcGVuZFRvQnVmZmVyKSB7XG4gICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICBidWZmZXIgPSBidWZmZXIgKyAnXFxuICAgICsgJyArIGxpbmUuY29udGVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidWZmZXIgPSBsaW5lLmNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICBzb3VyY2UgKz0gJ2J1ZmZlciArPSAnICsgYnVmZmVyICsgJztcXG4gICc7XG4gICAgICAgICAgYnVmZmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZSArPSBsaW5lICsgJ1xcbiAgJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfSxcblxuICAvLyBbYmxvY2tWYWx1ZV1cbiAgLy9cbiAgLy8gT24gc3RhY2ssIGJlZm9yZTogaGFzaCwgaW52ZXJzZSwgcHJvZ3JhbSwgdmFsdWVcbiAgLy8gT24gc3RhY2ssIGFmdGVyOiByZXR1cm4gdmFsdWUgb2YgYmxvY2tIZWxwZXJNaXNzaW5nXG4gIC8vXG4gIC8vIFRoZSBwdXJwb3NlIG9mIHRoaXMgb3Bjb2RlIGlzIHRvIHRha2UgYSBibG9jayBvZiB0aGUgZm9ybVxuICAvLyBge3sjZm9vfX0uLi57ey9mb299fWAsIHJlc29sdmUgdGhlIHZhbHVlIG9mIGBmb29gLCBhbmRcbiAgLy8gcmVwbGFjZSBpdCBvbiB0aGUgc3RhY2sgd2l0aCB0aGUgcmVzdWx0IG9mIHByb3Blcmx5XG4gIC8vIGludm9raW5nIGJsb2NrSGVscGVyTWlzc2luZy5cbiAgYmxvY2tWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb250ZXh0LmFsaWFzZXMuYmxvY2tIZWxwZXJNaXNzaW5nID0gJ2hlbHBlcnMuYmxvY2tIZWxwZXJNaXNzaW5nJztcblxuICAgIHZhciBwYXJhbXMgPSBbXCJkZXB0aDBcIl07XG4gICAgdGhpcy5zZXR1cFBhcmFtcygwLCBwYXJhbXMpO1xuXG4gICAgdGhpcy5yZXBsYWNlU3RhY2soZnVuY3Rpb24oY3VycmVudCkge1xuICAgICAgcGFyYW1zLnNwbGljZSgxLCAwLCBjdXJyZW50KTtcbiAgICAgIHJldHVybiBcImJsb2NrSGVscGVyTWlzc2luZy5jYWxsKFwiICsgcGFyYW1zLmpvaW4oXCIsIFwiKSArIFwiKVwiO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIFthbWJpZ3VvdXNCbG9ja1ZhbHVlXVxuICAvL1xuICAvLyBPbiBzdGFjaywgYmVmb3JlOiBoYXNoLCBpbnZlcnNlLCBwcm9ncmFtLCB2YWx1ZVxuICAvLyBDb21waWxlciB2YWx1ZSwgYmVmb3JlOiBsYXN0SGVscGVyPXZhbHVlIG9mIGxhc3QgZm91bmQgaGVscGVyLCBpZiBhbnlcbiAgLy8gT24gc3RhY2ssIGFmdGVyLCBpZiBubyBsYXN0SGVscGVyOiBzYW1lIGFzIFtibG9ja1ZhbHVlXVxuICAvLyBPbiBzdGFjaywgYWZ0ZXIsIGlmIGxhc3RIZWxwZXI6IHZhbHVlXG4gIGFtYmlndW91c0Jsb2NrVmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29udGV4dC5hbGlhc2VzLmJsb2NrSGVscGVyTWlzc2luZyA9ICdoZWxwZXJzLmJsb2NrSGVscGVyTWlzc2luZyc7XG5cbiAgICB2YXIgcGFyYW1zID0gW1wiZGVwdGgwXCJdO1xuICAgIHRoaXMuc2V0dXBQYXJhbXMoMCwgcGFyYW1zKTtcblxuICAgIHZhciBjdXJyZW50ID0gdGhpcy50b3BTdGFjaygpO1xuICAgIHBhcmFtcy5zcGxpY2UoMSwgMCwgY3VycmVudCk7XG5cbiAgICB0aGlzLnB1c2hTb3VyY2UoXCJpZiAoIVwiICsgdGhpcy5sYXN0SGVscGVyICsgXCIpIHsgXCIgKyBjdXJyZW50ICsgXCIgPSBibG9ja0hlbHBlck1pc3NpbmcuY2FsbChcIiArIHBhcmFtcy5qb2luKFwiLCBcIikgKyBcIik7IH1cIik7XG4gIH0sXG5cbiAgLy8gW2FwcGVuZENvbnRlbnRdXG4gIC8vXG4gIC8vIE9uIHN0YWNrLCBiZWZvcmU6IC4uLlxuICAvLyBPbiBzdGFjaywgYWZ0ZXI6IC4uLlxuICAvL1xuICAvLyBBcHBlbmRzIHRoZSBzdHJpbmcgdmFsdWUgb2YgYGNvbnRlbnRgIHRvIHRoZSBjdXJyZW50IGJ1ZmZlclxuICBhcHBlbmRDb250ZW50OiBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgaWYgKHRoaXMucGVuZGluZ0NvbnRlbnQpIHtcbiAgICAgIGNvbnRlbnQgPSB0aGlzLnBlbmRpbmdDb250ZW50ICsgY29udGVudDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3RyaXBOZXh0KSB7XG4gICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9eXFxzKy8sICcnKTtcbiAgICB9XG5cbiAgICB0aGlzLnBlbmRpbmdDb250ZW50ID0gY29udGVudDtcbiAgfSxcblxuICAvLyBbc3RyaXBdXG4gIC8vXG4gIC8vIE9uIHN0YWNrLCBiZWZvcmU6IC4uLlxuICAvLyBPbiBzdGFjaywgYWZ0ZXI6IC4uLlxuICAvL1xuICAvLyBSZW1vdmVzIGFueSB0cmFpbGluZyB3aGl0ZXNwYWNlIGZyb20gdGhlIHByaW9yIGNvbnRlbnQgbm9kZSBhbmQgZmxhZ3NcbiAgLy8gdGhlIG5leHQgb3BlcmF0aW9uIGZvciBzdHJpcHBpbmcgaWYgaXQgaXMgYSBjb250ZW50IG5vZGUuXG4gIHN0cmlwOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5wZW5kaW5nQ29udGVudCkge1xuICAgICAgdGhpcy5wZW5kaW5nQ29udGVudCA9IHRoaXMucGVuZGluZ0NvbnRlbnQucmVwbGFjZSgvXFxzKyQvLCAnJyk7XG4gICAgfVxuICAgIHRoaXMuc3RyaXBOZXh0ID0gJ3N0cmlwJztcbiAgfSxcblxuICAvLyBbYXBwZW5kXVxuICAvL1xuICAvLyBPbiBzdGFjaywgYmVmb3JlOiB2YWx1ZSwgLi4uXG4gIC8vIE9uIHN0YWNrLCBhZnRlcjogLi4uXG4gIC8vXG4gIC8vIENvZXJjZXMgYHZhbHVlYCB0byBhIFN0cmluZyBhbmQgYXBwZW5kcyBpdCB0byB0aGUgY3VycmVudCBidWZmZXIuXG4gIC8vXG4gIC8vIElmIGB2YWx1ZWAgaXMgdHJ1dGh5LCBvciAwLCBpdCBpcyBjb2VyY2VkIGludG8gYSBzdHJpbmcgYW5kIGFwcGVuZGVkXG4gIC8vIE90aGVyd2lzZSwgdGhlIGVtcHR5IHN0cmluZyBpcyBhcHBlbmRlZFxuICBhcHBlbmQ6IGZ1bmN0aW9uKCkge1xuICAgIC8vIEZvcmNlIGFueXRoaW5nIHRoYXQgaXMgaW5saW5lZCBvbnRvIHRoZSBzdGFjayBzbyB3ZSBkb24ndCBoYXZlIGR1cGxpY2F0aW9uXG4gICAgLy8gd2hlbiB3ZSBleGFtaW5lIGxvY2FsXG4gICAgdGhpcy5mbHVzaElubGluZSgpO1xuICAgIHZhciBsb2NhbCA9IHRoaXMucG9wU3RhY2soKTtcbiAgICB0aGlzLnB1c2hTb3VyY2UoXCJpZihcIiArIGxvY2FsICsgXCIgfHwgXCIgKyBsb2NhbCArIFwiID09PSAwKSB7IFwiICsgdGhpcy5hcHBlbmRUb0J1ZmZlcihsb2NhbCkgKyBcIiB9XCIpO1xuICAgIGlmICh0aGlzLmVudmlyb25tZW50LmlzU2ltcGxlKSB7XG4gICAgICB0aGlzLnB1c2hTb3VyY2UoXCJlbHNlIHsgXCIgKyB0aGlzLmFwcGVuZFRvQnVmZmVyKFwiJydcIikgKyBcIiB9XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBbYXBwZW5kRXNjYXBlZF1cbiAgLy9cbiAgLy8gT24gc3RhY2ssIGJlZm9yZTogdmFsdWUsIC4uLlxuICAvLyBPbiBzdGFjaywgYWZ0ZXI6IC4uLlxuICAvL1xuICAvLyBFc2NhcGUgYHZhbHVlYCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBidWZmZXJcbiAgYXBwZW5kRXNjYXBlZDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb250ZXh0LmFsaWFzZXMuZXNjYXBlRXhwcmVzc2lvbiA9ICd0aGlzLmVzY2FwZUV4cHJlc3Npb24nO1xuXG4gICAgdGhpcy5wdXNoU291cmNlKHRoaXMuYXBwZW5kVG9CdWZmZXIoXCJlc2NhcGVFeHByZXNzaW9uKFwiICsgdGhpcy5wb3BTdGFjaygpICsgXCIpXCIpKTtcbiAgfSxcblxuICAvLyBbZ2V0Q29udGV4dF1cbiAgLy9cbiAgLy8gT24gc3RhY2ssIGJlZm9yZTogLi4uXG4gIC8vIE9uIHN0YWNrLCBhZnRlcjogLi4uXG4gIC8vIENvbXBpbGVyIHZhbHVlLCBhZnRlcjogbGFzdENvbnRleHQ9ZGVwdGhcbiAgLy9cbiAgLy8gU2V0IHRoZSB2YWx1ZSBvZiB0aGUgYGxhc3RDb250ZXh0YCBjb21waWxlciB2YWx1ZSB0byB0aGUgZGVwdGhcbiAgZ2V0Q29udGV4dDogZnVuY3Rpb24oZGVwdGgpIHtcbiAgICBpZih0aGlzLmxhc3RDb250ZXh0ICE9PSBkZXB0aCkge1xuICAgICAgdGhpcy5sYXN0Q29udGV4dCA9IGRlcHRoO1xuICAgIH1cbiAgfSxcblxuICAvLyBbbG9va3VwT25Db250ZXh0XVxuICAvL1xuICAvLyBPbiBzdGFjaywgYmVmb3JlOiAuLi5cbiAgLy8gT24gc3RhY2ssIGFmdGVyOiBjdXJyZW50Q29udGV4dFtuYW1lXSwgLi4uXG4gIC8vXG4gIC8vIExvb2tzIHVwIHRoZSB2YWx1ZSBvZiBgbmFtZWAgb24gdGhlIGN1cnJlbnQgY29udGV4dCBhbmQgcHVzaGVzXG4gIC8vIGl0IG9udG8gdGhlIHN0YWNrLlxuICBsb29rdXBPbkNvbnRleHQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB0aGlzLnB1c2godGhpcy5uYW1lTG9va3VwKCdkZXB0aCcgKyB0aGlzLmxhc3RDb250ZXh0LCBuYW1lLCAnY29udGV4dCcpKTtcbiAgfSxcblxuICAvLyBbcHVzaENvbnRleHRdXG4gIC8vXG4gIC8vIE9uIHN0YWNrLCBiZWZvcmU6IC4uLlxuICAvLyBPbiBzdGFjaywgYWZ0ZXI6IGN1cnJlbnRDb250ZXh0LCAuLi5cbiAgLy9cbiAgLy8gUHVzaGVzIHRoZSB2YWx1ZSBvZiB0aGUgY3VycmVudCBjb250ZXh0IG9udG8gdGhlIHN0YWNrLlxuICBwdXNoQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKCdkZXB0aCcgKyB0aGlzLmxhc3RDb250ZXh0KTtcbiAgfSxcblxuICAvLyBbcmVzb2x2ZVBvc3NpYmxlTGFtYmRhXVxuICAvL1xuICAvLyBPbiBzdGFjaywgYmVmb3JlOiB2YWx1ZSwgLi4uXG4gIC8vIE9uIHN0YWNrLCBhZnRlcjogcmVzb2x2ZWQgdmFsdWUsIC4uLlxuICAvL1xuICAvLyBJZiB0aGUgYHZhbHVlYCBpcyBhIGxhbWJkYSwgcmVwbGFjZSBpdCBvbiB0aGUgc3RhY2sgYnlcbiAgLy8gdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgbGFtYmRhXG4gIHJlc29sdmVQb3NzaWJsZUxhbWJkYTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb250ZXh0LmFsaWFzZXMuZnVuY3Rpb25UeXBlID0gJ1wiZnVuY3Rpb25cIic7XG5cbiAgICB0aGlzLnJlcGxhY2VTdGFjayhmdW5jdGlvbihjdXJyZW50KSB7XG4gICAgICByZXR1cm4gXCJ0eXBlb2YgXCIgKyBjdXJyZW50ICsgXCIgPT09IGZ1bmN0aW9uVHlwZSA/IFwiICsgY3VycmVudCArIFwiLmFwcGx5KGRlcHRoMCkgOiBcIiArIGN1cnJlbnQ7XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gW2xvb2t1cF1cbiAgLy9cbiAgLy8gT24gc3RhY2ssIGJlZm9yZTogdmFsdWUsIC4uLlxuICAvLyBPbiBzdGFjaywgYWZ0ZXI6IHZhbHVlW25hbWVdLCAuLi5cbiAgLy9cbiAgLy8gUmVwbGFjZSB0aGUgdmFsdWUgb24gdGhlIHN0YWNrIHdpdGggdGhlIHJlc3VsdCBvZiBsb29raW5nXG4gIC8vIHVwIGBuYW1lYCBvbiBgdmFsdWVgXG4gIGxvb2t1cDogZnVuY3Rpb24obmFtZSkge1xuICAgIHRoaXMucmVwbGFjZVN0YWNrKGZ1bmN0aW9uKGN1cnJlbnQpIHtcbiAgICAgIHJldHVybiBjdXJyZW50ICsgXCIgPT0gbnVsbCB8fCBcIiArIGN1cnJlbnQgKyBcIiA9PT0gZmFsc2UgPyBcIiArIGN1cnJlbnQgKyBcIiA6IFwiICsgdGhpcy5uYW1lTG9va3VwKGN1cnJlbnQsIG5hbWUsICdjb250ZXh0Jyk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gW2xvb2t1cERhdGFdXG4gIC8vXG4gIC8vIE9uIHN0YWNrLCBiZWZvcmU6IC4uLlxuICAvLyBPbiBzdGFjaywgYWZ0ZXI6IGRhdGEsIC4uLlxuICAvL1xuICAvLyBQdXNoIHRoZSBkYXRhIGxvb2t1cCBvcGVyYXRvclxuICBsb29rdXBEYXRhOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnB1c2hTdGFja0xpdGVyYWwoJ2RhdGEnKTtcbiAgfSxcblxuICAvLyBbcHVzaFN0cmluZ1BhcmFtXVxuICAvL1xuICAvLyBPbiBzdGFjaywgYmVmb3JlOiAuLi5cbiAgLy8gT24gc3RhY2ssIGFmdGVyOiBzdHJpbmcsIGN1cnJlbnRDb250ZXh0LCAuLi5cbiAgLy9cbiAgLy8gVGhpcyBvcGNvZGUgaXMgZGVzaWduZWQgZm9yIHVzZSBpbiBzdHJpbmcgbW9kZSwgd2hpY2hcbiAgLy8gcHJvdmlkZXMgdGhlIHN0cmluZyB2YWx1ZSBvZiBhIHBhcmFtZXRlciBhbG9uZyB3aXRoIGl0c1xuICAvLyBkZXB0aCByYXRoZXIgdGhhbiByZXNvbHZpbmcgaXQgaW1tZWRpYXRlbHkuXG4gIHB1c2hTdHJpbmdQYXJhbTogZnVuY3Rpb24oc3RyaW5nLCB0eXBlKSB7XG4gICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKCdkZXB0aCcgKyB0aGlzLmxhc3RDb250ZXh0KTtcblxuICAgIHRoaXMucHVzaFN0cmluZyh0eXBlKTtcblxuICAgIC8vIElmIGl0J3MgYSBzdWJleHByZXNzaW9uLCB0aGUgc3RyaW5nIHJlc3VsdFxuICAgIC8vIHdpbGwgYmUgcHVzaGVkIGFmdGVyIHRoaXMgb3Bjb2RlLlxuICAgIGlmICh0eXBlICE9PSAnc2V4cHInKSB7XG4gICAgICBpZiAodHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5wdXNoU3RyaW5nKHN0cmluZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB1c2hTdGFja0xpdGVyYWwoc3RyaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZW1wdHlIYXNoOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnB1c2hTdGFja0xpdGVyYWwoJ3t9Jyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnN0cmluZ1BhcmFtcykge1xuICAgICAgdGhpcy5wdXNoKCd7fScpOyAvLyBoYXNoQ29udGV4dHNcbiAgICAgIHRoaXMucHVzaCgne30nKTsgLy8gaGFzaFR5cGVzXG4gICAgfVxuICB9LFxuICBwdXNoSGFzaDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuaGFzaCkge1xuICAgICAgdGhpcy5oYXNoZXMucHVzaCh0aGlzLmhhc2gpO1xuICAgIH1cbiAgICB0aGlzLmhhc2ggPSB7dmFsdWVzOiBbXSwgdHlwZXM6IFtdLCBjb250ZXh0czogW119O1xuICB9LFxuICBwb3BIYXNoOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaGFzaCA9IHRoaXMuaGFzaDtcbiAgICB0aGlzLmhhc2ggPSB0aGlzLmhhc2hlcy5wb3AoKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3RyaW5nUGFyYW1zKSB7XG4gICAgICB0aGlzLnB1c2goJ3snICsgaGFzaC5jb250ZXh0cy5qb2luKCcsJykgKyAnfScpO1xuICAgICAgdGhpcy5wdXNoKCd7JyArIGhhc2gudHlwZXMuam9pbignLCcpICsgJ30nKTtcbiAgICB9XG5cbiAgICB0aGlzLnB1c2goJ3tcXG4gICAgJyArIGhhc2gudmFsdWVzLmpvaW4oJyxcXG4gICAgJykgKyAnXFxuICB9Jyk7XG4gIH0sXG5cbiAgLy8gW3B1c2hTdHJpbmddXG4gIC8vXG4gIC8vIE9uIHN0YWNrLCBiZWZvcmU6IC4uLlxuICAvLyBPbiBzdGFjaywgYWZ0ZXI6IHF1b3RlZFN0cmluZyhzdHJpbmcpLCAuLi5cbiAgLy9cbiAgLy8gUHVzaCBhIHF1b3RlZCB2ZXJzaW9uIG9mIGBzdHJpbmdgIG9udG8gdGhlIHN0YWNrXG4gIHB1c2hTdHJpbmc6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHRoaXMucHVzaFN0YWNrTGl0ZXJhbCh0aGlzLnF1b3RlZFN0cmluZyhzdHJpbmcpKTtcbiAgfSxcblxuICAvLyBbcHVzaF1cbiAgLy9cbiAgLy8gT24gc3RhY2ssIGJlZm9yZTogLi4uXG4gIC8vIE9uIHN0YWNrLCBhZnRlcjogZXhwciwgLi4uXG4gIC8vXG4gIC8vIFB1c2ggYW4gZXhwcmVzc2lvbiBvbnRvIHRoZSBzdGFja1xuICBwdXNoOiBmdW5jdGlvbihleHByKSB7XG4gICAgdGhpcy5pbmxpbmVTdGFjay5wdXNoKGV4cHIpO1xuICAgIHJldHVybiBleHByO1xuICB9LFxuXG4gIC8vIFtwdXNoTGl0ZXJhbF1cbiAgLy9cbiAgLy8gT24gc3RhY2ssIGJlZm9yZTogLi4uXG4gIC8vIE9uIHN0YWNrLCBhZnRlcjogdmFsdWUsIC4uLlxuICAvL1xuICAvLyBQdXNoZXMgYSB2YWx1ZSBvbnRvIHRoZSBzdGFjay4gVGhpcyBvcGVyYXRpb24gcHJldmVudHNcbiAgLy8gdGhlIGNvbXBpbGVyIGZyb20gY3JlYXRpbmcgYSB0ZW1wb3JhcnkgdmFyaWFibGUgdG8gaG9sZFxuICAvLyBpdC5cbiAgcHVzaExpdGVyYWw6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdGhpcy5wdXNoU3RhY2tMaXRlcmFsKHZhbHVlKTtcbiAgfSxcblxuICAvLyBbcHVzaFByb2dyYW1dXG4gIC8vXG4gIC8vIE9uIHN0YWNrLCBiZWZvcmU6IC4uLlxuICAvLyBPbiBzdGFjaywgYWZ0ZXI6IHByb2dyYW0oZ3VpZCksIC4uLlxuICAvL1xuICAvLyBQdXNoIGEgcHJvZ3JhbSBleHByZXNzaW9uIG9udG8gdGhlIHN0YWNrLiBUaGlzIHRha2VzXG4gIC8vIGEgY29tcGlsZS10aW1lIGd1aWQgYW5kIGNvbnZlcnRzIGl0IGludG8gYSBydW50aW1lLWFjY2Vzc2libGVcbiAgLy8gZXhwcmVzc2lvbi5cbiAgcHVzaFByb2dyYW06IGZ1bmN0aW9uKGd1aWQpIHtcbiAgICBpZiAoZ3VpZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnB1c2hTdGFja0xpdGVyYWwodGhpcy5wcm9ncmFtRXhwcmVzc2lvbihndWlkKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHVzaFN0YWNrTGl0ZXJhbChudWxsKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gW2ludm9rZUhlbHBlcl1cbiAgLy9cbiAgLy8gT24gc3RhY2ssIGJlZm9yZTogaGFzaCwgaW52ZXJzZSwgcHJvZ3JhbSwgcGFyYW1zLi4uLCAuLi5cbiAgLy8gT24gc3RhY2ssIGFmdGVyOiByZXN1bHQgb2YgaGVscGVyIGludm9jYXRpb25cbiAgLy9cbiAgLy8gUG9wcyBvZmYgdGhlIGhlbHBlcidzIHBhcmFtZXRlcnMsIGludm9rZXMgdGhlIGhlbHBlcixcbiAgLy8gYW5kIHB1c2hlcyB0aGUgaGVscGVyJ3MgcmV0dXJuIHZhbHVlIG9udG8gdGhlIHN0YWNrLlxuICAvL1xuICAvLyBJZiB0aGUgaGVscGVyIGlzIG5vdCBmb3VuZCwgYGhlbHBlck1pc3NpbmdgIGlzIGNhbGxlZC5cbiAgaW52b2tlSGVscGVyOiBmdW5jdGlvbihwYXJhbVNpemUsIG5hbWUsIGlzUm9vdCkge1xuICAgIHRoaXMuY29udGV4dC5hbGlhc2VzLmhlbHBlck1pc3NpbmcgPSAnaGVscGVycy5oZWxwZXJNaXNzaW5nJztcbiAgICB0aGlzLnVzZVJlZ2lzdGVyKCdoZWxwZXInKTtcblxuICAgIHZhciBoZWxwZXIgPSB0aGlzLmxhc3RIZWxwZXIgPSB0aGlzLnNldHVwSGVscGVyKHBhcmFtU2l6ZSwgbmFtZSwgdHJ1ZSk7XG4gICAgdmFyIG5vbkhlbHBlciA9IHRoaXMubmFtZUxvb2t1cCgnZGVwdGgnICsgdGhpcy5sYXN0Q29udGV4dCwgbmFtZSwgJ2NvbnRleHQnKTtcblxuICAgIHZhciBsb29rdXAgPSAnaGVscGVyID0gJyArIGhlbHBlci5uYW1lICsgJyB8fCAnICsgbm9uSGVscGVyO1xuICAgIGlmIChoZWxwZXIucGFyYW1zSW5pdCkge1xuICAgICAgbG9va3VwICs9ICcsJyArIGhlbHBlci5wYXJhbXNJbml0O1xuICAgIH1cblxuICAgIHRoaXMucHVzaChcbiAgICAgICcoJ1xuICAgICAgICArIGxvb2t1cFxuICAgICAgICArICcsaGVscGVyICdcbiAgICAgICAgICArICc/IGhlbHBlci5jYWxsKCcgKyBoZWxwZXIuY2FsbFBhcmFtcyArICcpICdcbiAgICAgICAgICArICc6IGhlbHBlck1pc3NpbmcuY2FsbCgnICsgaGVscGVyLmhlbHBlck1pc3NpbmdQYXJhbXMgKyAnKSknKTtcblxuICAgIC8vIEFsd2F5cyBmbHVzaCBzdWJleHByZXNzaW9ucy4gVGhpcyBpcyBib3RoIHRvIHByZXZlbnQgdGhlIGNvbXBvdW5kaW5nIHNpemUgaXNzdWUgdGhhdFxuICAgIC8vIG9jY3VycyB3aGVuIHRoZSBjb2RlIGhhcyB0byBiZSBkdXBsaWNhdGVkIGZvciBpbmxpbmluZyBhbmQgYWxzbyB0byBwcmV2ZW50IGVycm9yc1xuICAgIC8vIGR1ZSB0byB0aGUgaW5jb3JyZWN0IG9wdGlvbnMgb2JqZWN0IGJlaW5nIHBhc3NlZCBkdWUgdG8gdGhlIHNoYXJlZCByZWdpc3Rlci5cbiAgICBpZiAoIWlzUm9vdCkge1xuICAgICAgdGhpcy5mbHVzaElubGluZSgpO1xuICAgIH1cbiAgfSxcblxuICAvLyBbaW52b2tlS25vd25IZWxwZXJdXG4gIC8vXG4gIC8vIE9uIHN0YWNrLCBiZWZvcmU6IGhhc2gsIGludmVyc2UsIHByb2dyYW0sIHBhcmFtcy4uLiwgLi4uXG4gIC8vIE9uIHN0YWNrLCBhZnRlcjogcmVzdWx0IG9mIGhlbHBlciBpbnZvY2F0aW9uXG4gIC8vXG4gIC8vIFRoaXMgb3BlcmF0aW9uIGlzIHVzZWQgd2hlbiB0aGUgaGVscGVyIGlzIGtub3duIHRvIGV4aXN0LFxuICAvLyBzbyBhIGBoZWxwZXJNaXNzaW5nYCBmYWxsYmFjayBpcyBub3QgcmVxdWlyZWQuXG4gIGludm9rZUtub3duSGVscGVyOiBmdW5jdGlvbihwYXJhbVNpemUsIG5hbWUpIHtcbiAgICB2YXIgaGVscGVyID0gdGhpcy5zZXR1cEhlbHBlcihwYXJhbVNpemUsIG5hbWUpO1xuICAgIHRoaXMucHVzaChoZWxwZXIubmFtZSArIFwiLmNhbGwoXCIgKyBoZWxwZXIuY2FsbFBhcmFtcyArIFwiKVwiKTtcbiAgfSxcblxuICAvLyBbaW52b2tlQW1iaWd1b3VzXVxuICAvL1xuICAvLyBPbiBzdGFjaywgYmVmb3JlOiBoYXNoLCBpbnZlcnNlLCBwcm9ncmFtLCBwYXJhbXMuLi4sIC4uLlxuICAvLyBPbiBzdGFjaywgYWZ0ZXI6IHJlc3VsdCBvZiBkaXNhbWJpZ3VhdGlvblxuICAvL1xuICAvLyBUaGlzIG9wZXJhdGlvbiBpcyB1c2VkIHdoZW4gYW4gZXhwcmVzc2lvbiBsaWtlIGB7e2Zvb319YFxuICAvLyBpcyBwcm92aWRlZCwgYnV0IHdlIGRvbid0IGtub3cgYXQgY29tcGlsZS10aW1lIHdoZXRoZXIgaXRcbiAgLy8gaXMgYSBoZWxwZXIgb3IgYSBwYXRoLlxuICAvL1xuICAvLyBUaGlzIG9wZXJhdGlvbiBlbWl0cyBtb3JlIGNvZGUgdGhhbiB0aGUgb3RoZXIgb3B0aW9ucyxcbiAgLy8gYW5kIGNhbiBiZSBhdm9pZGVkIGJ5IHBhc3NpbmcgdGhlIGBrbm93bkhlbHBlcnNgIGFuZFxuICAvLyBga25vd25IZWxwZXJzT25seWAgZmxhZ3MgYXQgY29tcGlsZS10aW1lLlxuICBpbnZva2VBbWJpZ3VvdXM6IGZ1bmN0aW9uKG5hbWUsIGhlbHBlckNhbGwpIHtcbiAgICB0aGlzLmNvbnRleHQuYWxpYXNlcy5mdW5jdGlvblR5cGUgPSAnXCJmdW5jdGlvblwiJztcbiAgICB0aGlzLnVzZVJlZ2lzdGVyKCdoZWxwZXInKTtcblxuICAgIHRoaXMuZW1wdHlIYXNoKCk7XG4gICAgdmFyIGhlbHBlciA9IHRoaXMuc2V0dXBIZWxwZXIoMCwgbmFtZSwgaGVscGVyQ2FsbCk7XG5cbiAgICB2YXIgaGVscGVyTmFtZSA9IHRoaXMubGFzdEhlbHBlciA9IHRoaXMubmFtZUxvb2t1cCgnaGVscGVycycsIG5hbWUsICdoZWxwZXInKTtcblxuICAgIHZhciBub25IZWxwZXIgPSB0aGlzLm5hbWVMb29rdXAoJ2RlcHRoJyArIHRoaXMubGFzdENvbnRleHQsIG5hbWUsICdjb250ZXh0Jyk7XG4gICAgdmFyIG5leHRTdGFjayA9IHRoaXMubmV4dFN0YWNrKCk7XG5cbiAgICBpZiAoaGVscGVyLnBhcmFtc0luaXQpIHtcbiAgICAgIHRoaXMucHVzaFNvdXJjZShoZWxwZXIucGFyYW1zSW5pdCk7XG4gICAgfVxuICAgIHRoaXMucHVzaFNvdXJjZSgnaWYgKGhlbHBlciA9ICcgKyBoZWxwZXJOYW1lICsgJykgeyAnICsgbmV4dFN0YWNrICsgJyA9IGhlbHBlci5jYWxsKCcgKyBoZWxwZXIuY2FsbFBhcmFtcyArICcpOyB9Jyk7XG4gICAgdGhpcy5wdXNoU291cmNlKCdlbHNlIHsgaGVscGVyID0gJyArIG5vbkhlbHBlciArICc7ICcgKyBuZXh0U3RhY2sgKyAnID0gdHlwZW9mIGhlbHBlciA9PT0gZnVuY3Rpb25UeXBlID8gaGVscGVyLmNhbGwoJyArIGhlbHBlci5jYWxsUGFyYW1zICsgJykgOiBoZWxwZXI7IH0nKTtcbiAgfSxcblxuICAvLyBbaW52b2tlUGFydGlhbF1cbiAgLy9cbiAgLy8gT24gc3RhY2ssIGJlZm9yZTogY29udGV4dCwgLi4uXG4gIC8vIE9uIHN0YWNrIGFmdGVyOiByZXN1bHQgb2YgcGFydGlhbCBpbnZvY2F0aW9uXG4gIC8vXG4gIC8vIFRoaXMgb3BlcmF0aW9uIHBvcHMgb2ZmIGEgY29udGV4dCwgaW52b2tlcyBhIHBhcnRpYWwgd2l0aCB0aGF0IGNvbnRleHQsXG4gIC8vIGFuZCBwdXNoZXMgdGhlIHJlc3VsdCBvZiB0aGUgaW52b2NhdGlvbiBiYWNrLlxuICBpbnZva2VQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIHBhcmFtcyA9IFt0aGlzLm5hbWVMb29rdXAoJ3BhcnRpYWxzJywgbmFtZSwgJ3BhcnRpYWwnKSwgXCInXCIgKyBuYW1lICsgXCInXCIsIHRoaXMucG9wU3RhY2soKSwgXCJoZWxwZXJzXCIsIFwicGFydGlhbHNcIl07XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmRhdGEpIHtcbiAgICAgIHBhcmFtcy5wdXNoKFwiZGF0YVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQuYWxpYXNlcy5zZWxmID0gXCJ0aGlzXCI7XG4gICAgdGhpcy5wdXNoKFwic2VsZi5pbnZva2VQYXJ0aWFsKFwiICsgcGFyYW1zLmpvaW4oXCIsIFwiKSArIFwiKVwiKTtcbiAgfSxcblxuICAvLyBbYXNzaWduVG9IYXNoXVxuICAvL1xuICAvLyBPbiBzdGFjaywgYmVmb3JlOiB2YWx1ZSwgaGFzaCwgLi4uXG4gIC8vIE9uIHN0YWNrLCBhZnRlcjogaGFzaCwgLi4uXG4gIC8vXG4gIC8vIFBvcHMgYSB2YWx1ZSBhbmQgaGFzaCBvZmYgdGhlIHN0YWNrLCBhc3NpZ25zIGBoYXNoW2tleV0gPSB2YWx1ZWBcbiAgLy8gYW5kIHB1c2hlcyB0aGUgaGFzaCBiYWNrIG9udG8gdGhlIHN0YWNrLlxuICBhc3NpZ25Ub0hhc2g6IGZ1bmN0aW9uKGtleSkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMucG9wU3RhY2soKSxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgdHlwZTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3RyaW5nUGFyYW1zKSB7XG4gICAgICB0eXBlID0gdGhpcy5wb3BTdGFjaygpO1xuICAgICAgY29udGV4dCA9IHRoaXMucG9wU3RhY2soKTtcbiAgICB9XG5cbiAgICB2YXIgaGFzaCA9IHRoaXMuaGFzaDtcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgaGFzaC5jb250ZXh0cy5wdXNoKFwiJ1wiICsga2V5ICsgXCInOiBcIiArIGNvbnRleHQpO1xuICAgIH1cbiAgICBpZiAodHlwZSkge1xuICAgICAgaGFzaC50eXBlcy5wdXNoKFwiJ1wiICsga2V5ICsgXCInOiBcIiArIHR5cGUpO1xuICAgIH1cbiAgICBoYXNoLnZhbHVlcy5wdXNoKFwiJ1wiICsga2V5ICsgXCInOiAoXCIgKyB2YWx1ZSArIFwiKVwiKTtcbiAgfSxcblxuICAvLyBIRUxQRVJTXG5cbiAgY29tcGlsZXI6IEphdmFTY3JpcHRDb21waWxlcixcblxuICBjb21waWxlQ2hpbGRyZW46IGZ1bmN0aW9uKGVudmlyb25tZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gZW52aXJvbm1lbnQuY2hpbGRyZW4sIGNoaWxkLCBjb21waWxlcjtcblxuICAgIGZvcih2YXIgaT0wLCBsPWNoaWxkcmVuLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBjb21waWxlciA9IG5ldyB0aGlzLmNvbXBpbGVyKCk7XG5cbiAgICAgIHZhciBpbmRleCA9IHRoaXMubWF0Y2hFeGlzdGluZ1Byb2dyYW0oY2hpbGQpO1xuXG4gICAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbnRleHQucHJvZ3JhbXMucHVzaCgnJyk7ICAgICAvLyBQbGFjZWhvbGRlciB0byBwcmV2ZW50IG5hbWUgY29uZmxpY3RzIGZvciBuZXN0ZWQgY2hpbGRyZW5cbiAgICAgICAgaW5kZXggPSB0aGlzLmNvbnRleHQucHJvZ3JhbXMubGVuZ3RoO1xuICAgICAgICBjaGlsZC5pbmRleCA9IGluZGV4O1xuICAgICAgICBjaGlsZC5uYW1lID0gJ3Byb2dyYW0nICsgaW5kZXg7XG4gICAgICAgIHRoaXMuY29udGV4dC5wcm9ncmFtc1tpbmRleF0gPSBjb21waWxlci5jb21waWxlKGNoaWxkLCBvcHRpb25zLCB0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLmNvbnRleHQuZW52aXJvbm1lbnRzW2luZGV4XSA9IGNoaWxkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGQuaW5kZXggPSBpbmRleDtcbiAgICAgICAgY2hpbGQubmFtZSA9ICdwcm9ncmFtJyArIGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWF0Y2hFeGlzdGluZ1Byb2dyYW06IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuY29udGV4dC5lbnZpcm9ubWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBlbnZpcm9ubWVudCA9IHRoaXMuY29udGV4dC5lbnZpcm9ubWVudHNbaV07XG4gICAgICBpZiAoZW52aXJvbm1lbnQgJiYgZW52aXJvbm1lbnQuZXF1YWxzKGNoaWxkKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcHJvZ3JhbUV4cHJlc3Npb246IGZ1bmN0aW9uKGd1aWQpIHtcbiAgICB0aGlzLmNvbnRleHQuYWxpYXNlcy5zZWxmID0gXCJ0aGlzXCI7XG5cbiAgICBpZihndWlkID09IG51bGwpIHtcbiAgICAgIHJldHVybiBcInNlbGYubm9vcFwiO1xuICAgIH1cblxuICAgIHZhciBjaGlsZCA9IHRoaXMuZW52aXJvbm1lbnQuY2hpbGRyZW5bZ3VpZF0sXG4gICAgICAgIGRlcHRocyA9IGNoaWxkLmRlcHRocy5saXN0LCBkZXB0aDtcblxuICAgIHZhciBwcm9ncmFtUGFyYW1zID0gW2NoaWxkLmluZGV4LCBjaGlsZC5uYW1lLCBcImRhdGFcIl07XG5cbiAgICBmb3IodmFyIGk9MCwgbCA9IGRlcHRocy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICBkZXB0aCA9IGRlcHRoc1tpXTtcblxuICAgICAgaWYoZGVwdGggPT09IDEpIHsgcHJvZ3JhbVBhcmFtcy5wdXNoKFwiZGVwdGgwXCIpOyB9XG4gICAgICBlbHNlIHsgcHJvZ3JhbVBhcmFtcy5wdXNoKFwiZGVwdGhcIiArIChkZXB0aCAtIDEpKTsgfVxuICAgIH1cblxuICAgIHJldHVybiAoZGVwdGhzLmxlbmd0aCA9PT0gMCA/IFwic2VsZi5wcm9ncmFtKFwiIDogXCJzZWxmLnByb2dyYW1XaXRoRGVwdGgoXCIpICsgcHJvZ3JhbVBhcmFtcy5qb2luKFwiLCBcIikgKyBcIilcIjtcbiAgfSxcblxuICByZWdpc3RlcjogZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gICAgdGhpcy51c2VSZWdpc3RlcihuYW1lKTtcbiAgICB0aGlzLnB1c2hTb3VyY2UobmFtZSArIFwiID0gXCIgKyB2YWwgKyBcIjtcIik7XG4gIH0sXG5cbiAgdXNlUmVnaXN0ZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBpZighdGhpcy5yZWdpc3RlcnNbbmFtZV0pIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJzW25hbWVdID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVnaXN0ZXJzLmxpc3QucHVzaChuYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgcHVzaFN0YWNrTGl0ZXJhbDogZnVuY3Rpb24oaXRlbSkge1xuICAgIHJldHVybiB0aGlzLnB1c2gobmV3IExpdGVyYWwoaXRlbSkpO1xuICB9LFxuXG4gIHB1c2hTb3VyY2U6IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgIGlmICh0aGlzLnBlbmRpbmdDb250ZW50KSB7XG4gICAgICB0aGlzLnNvdXJjZS5wdXNoKHRoaXMuYXBwZW5kVG9CdWZmZXIodGhpcy5xdW90ZWRTdHJpbmcodGhpcy5wZW5kaW5nQ29udGVudCkpKTtcbiAgICAgIHRoaXMucGVuZGluZ0NvbnRlbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UucHVzaChzb3VyY2UpO1xuICAgIH1cbiAgfSxcblxuICBwdXNoU3RhY2s6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICB0aGlzLmZsdXNoSW5saW5lKCk7XG5cbiAgICB2YXIgc3RhY2sgPSB0aGlzLmluY3JTdGFjaygpO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICB0aGlzLnB1c2hTb3VyY2Uoc3RhY2sgKyBcIiA9IFwiICsgaXRlbSArIFwiO1wiKTtcbiAgICB9XG4gICAgdGhpcy5jb21waWxlU3RhY2sucHVzaChzdGFjayk7XG4gICAgcmV0dXJuIHN0YWNrO1xuICB9LFxuXG4gIHJlcGxhY2VTdGFjazogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB2YXIgcHJlZml4ID0gJycsXG4gICAgICAgIGlubGluZSA9IHRoaXMuaXNJbmxpbmUoKSxcbiAgICAgICAgc3RhY2ssXG4gICAgICAgIGNyZWF0ZWRTdGFjayxcbiAgICAgICAgdXNlZExpdGVyYWw7XG5cbiAgICAvLyBJZiB3ZSBhcmUgY3VycmVudGx5IGlubGluZSB0aGVuIHdlIHdhbnQgdG8gbWVyZ2UgdGhlIGlubGluZSBzdGF0ZW1lbnQgaW50byB0aGVcbiAgICAvLyByZXBsYWNlbWVudCBzdGF0ZW1lbnQgdmlhICcsJ1xuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgIHZhciB0b3AgPSB0aGlzLnBvcFN0YWNrKHRydWUpO1xuXG4gICAgICBpZiAodG9wIGluc3RhbmNlb2YgTGl0ZXJhbCkge1xuICAgICAgICAvLyBMaXRlcmFscyBkbyBub3QgbmVlZCB0byBiZSBpbmxpbmVkXG4gICAgICAgIHN0YWNrID0gdG9wLnZhbHVlO1xuICAgICAgICB1c2VkTGl0ZXJhbCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBHZXQgb3IgY3JlYXRlIHRoZSBjdXJyZW50IHN0YWNrIG5hbWUgZm9yIHVzZSBieSB0aGUgaW5saW5lXG4gICAgICAgIGNyZWF0ZWRTdGFjayA9ICF0aGlzLnN0YWNrU2xvdDtcbiAgICAgICAgdmFyIG5hbWUgPSAhY3JlYXRlZFN0YWNrID8gdGhpcy50b3BTdGFja05hbWUoKSA6IHRoaXMuaW5jclN0YWNrKCk7XG5cbiAgICAgICAgcHJlZml4ID0gJygnICsgdGhpcy5wdXNoKG5hbWUpICsgJyA9ICcgKyB0b3AgKyAnKSwnO1xuICAgICAgICBzdGFjayA9IHRoaXMudG9wU3RhY2soKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RhY2sgPSB0aGlzLnRvcFN0YWNrKCk7XG4gICAgfVxuXG4gICAgdmFyIGl0ZW0gPSBjYWxsYmFjay5jYWxsKHRoaXMsIHN0YWNrKTtcblxuICAgIGlmIChpbmxpbmUpIHtcbiAgICAgIGlmICghdXNlZExpdGVyYWwpIHtcbiAgICAgICAgdGhpcy5wb3BTdGFjaygpO1xuICAgICAgfVxuICAgICAgaWYgKGNyZWF0ZWRTdGFjaykge1xuICAgICAgICB0aGlzLnN0YWNrU2xvdC0tO1xuICAgICAgfVxuICAgICAgdGhpcy5wdXNoKCcoJyArIHByZWZpeCArIGl0ZW0gKyAnKScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQcmV2ZW50IG1vZGlmaWNhdGlvbiBvZiB0aGUgY29udGV4dCBkZXB0aCB2YXJpYWJsZS4gVGhyb3VnaCByZXBsYWNlU3RhY2tcbiAgICAgIGlmICghL15zdGFjay8udGVzdChzdGFjaykpIHtcbiAgICAgICAgc3RhY2sgPSB0aGlzLm5leHRTdGFjaygpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnB1c2hTb3VyY2Uoc3RhY2sgKyBcIiA9IChcIiArIHByZWZpeCArIGl0ZW0gKyBcIik7XCIpO1xuICAgIH1cbiAgICByZXR1cm4gc3RhY2s7XG4gIH0sXG5cbiAgbmV4dFN0YWNrOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wdXNoU3RhY2soKTtcbiAgfSxcblxuICBpbmNyU3RhY2s6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3RhY2tTbG90Kys7XG4gICAgaWYodGhpcy5zdGFja1Nsb3QgPiB0aGlzLnN0YWNrVmFycy5sZW5ndGgpIHsgdGhpcy5zdGFja1ZhcnMucHVzaChcInN0YWNrXCIgKyB0aGlzLnN0YWNrU2xvdCk7IH1cbiAgICByZXR1cm4gdGhpcy50b3BTdGFja05hbWUoKTtcbiAgfSxcbiAgdG9wU3RhY2tOYW1lOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJzdGFja1wiICsgdGhpcy5zdGFja1Nsb3Q7XG4gIH0sXG4gIGZsdXNoSW5saW5lOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5saW5lU3RhY2sgPSB0aGlzLmlubGluZVN0YWNrO1xuICAgIGlmIChpbmxpbmVTdGFjay5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5saW5lU3RhY2sgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBpbmxpbmVTdGFjay5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgZW50cnkgPSBpbmxpbmVTdGFja1tpXTtcbiAgICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgTGl0ZXJhbCkge1xuICAgICAgICAgIHRoaXMuY29tcGlsZVN0YWNrLnB1c2goZW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHVzaFN0YWNrKGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgaXNJbmxpbmU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmlubGluZVN0YWNrLmxlbmd0aDtcbiAgfSxcblxuICBwb3BTdGFjazogZnVuY3Rpb24od3JhcHBlZCkge1xuICAgIHZhciBpbmxpbmUgPSB0aGlzLmlzSW5saW5lKCksXG4gICAgICAgIGl0ZW0gPSAoaW5saW5lID8gdGhpcy5pbmxpbmVTdGFjayA6IHRoaXMuY29tcGlsZVN0YWNrKS5wb3AoKTtcblxuICAgIGlmICghd3JhcHBlZCAmJiAoaXRlbSBpbnN0YW5jZW9mIExpdGVyYWwpKSB7XG4gICAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFpbmxpbmUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YWNrU2xvdCkge1xuICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ0ludmFsaWQgc3RhY2sgcG9wJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFja1Nsb3QtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgfSxcblxuICB0b3BTdGFjazogZnVuY3Rpb24od3JhcHBlZCkge1xuICAgIHZhciBzdGFjayA9ICh0aGlzLmlzSW5saW5lKCkgPyB0aGlzLmlubGluZVN0YWNrIDogdGhpcy5jb21waWxlU3RhY2spLFxuICAgICAgICBpdGVtID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG5cbiAgICBpZiAoIXdyYXBwZWQgJiYgKGl0ZW0gaW5zdGFuY2VvZiBMaXRlcmFsKSkge1xuICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgfSxcblxuICBxdW90ZWRTdHJpbmc6IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiAnXCInICsgc3RyXG4gICAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKVxuICAgICAgLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKVxuICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuICAgICAgLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKVxuICAgICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgJ1xcXFx1MjAyOCcpICAgLy8gUGVyIEVjbWEtMjYyIDcuMyArIDcuOC40XG4gICAgICAucmVwbGFjZSgvXFx1MjAyOS9nLCAnXFxcXHUyMDI5JykgKyAnXCInO1xuICB9LFxuXG4gIHNldHVwSGVscGVyOiBmdW5jdGlvbihwYXJhbVNpemUsIG5hbWUsIG1pc3NpbmdQYXJhbXMpIHtcbiAgICB2YXIgcGFyYW1zID0gW10sXG4gICAgICAgIHBhcmFtc0luaXQgPSB0aGlzLnNldHVwUGFyYW1zKHBhcmFtU2l6ZSwgcGFyYW1zLCBtaXNzaW5nUGFyYW1zKTtcbiAgICB2YXIgZm91bmRIZWxwZXIgPSB0aGlzLm5hbWVMb29rdXAoJ2hlbHBlcnMnLCBuYW1lLCAnaGVscGVyJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICBwYXJhbXNJbml0OiBwYXJhbXNJbml0LFxuICAgICAgbmFtZTogZm91bmRIZWxwZXIsXG4gICAgICBjYWxsUGFyYW1zOiBbXCJkZXB0aDBcIl0uY29uY2F0KHBhcmFtcykuam9pbihcIiwgXCIpLFxuICAgICAgaGVscGVyTWlzc2luZ1BhcmFtczogbWlzc2luZ1BhcmFtcyAmJiBbXCJkZXB0aDBcIiwgdGhpcy5xdW90ZWRTdHJpbmcobmFtZSldLmNvbmNhdChwYXJhbXMpLmpvaW4oXCIsIFwiKVxuICAgIH07XG4gIH0sXG5cbiAgc2V0dXBPcHRpb25zOiBmdW5jdGlvbihwYXJhbVNpemUsIHBhcmFtcykge1xuICAgIHZhciBvcHRpb25zID0gW10sIGNvbnRleHRzID0gW10sIHR5cGVzID0gW10sIHBhcmFtLCBpbnZlcnNlLCBwcm9ncmFtO1xuXG4gICAgb3B0aW9ucy5wdXNoKFwiaGFzaDpcIiArIHRoaXMucG9wU3RhY2soKSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnN0cmluZ1BhcmFtcykge1xuICAgICAgb3B0aW9ucy5wdXNoKFwiaGFzaFR5cGVzOlwiICsgdGhpcy5wb3BTdGFjaygpKTtcbiAgICAgIG9wdGlvbnMucHVzaChcImhhc2hDb250ZXh0czpcIiArIHRoaXMucG9wU3RhY2soKSk7XG4gICAgfVxuXG4gICAgaW52ZXJzZSA9IHRoaXMucG9wU3RhY2soKTtcbiAgICBwcm9ncmFtID0gdGhpcy5wb3BTdGFjaygpO1xuXG4gICAgLy8gQXZvaWQgc2V0dGluZyBmbiBhbmQgaW52ZXJzZSBpZiBuZWl0aGVyIGFyZSBzZXQuIFRoaXMgYWxsb3dzXG4gICAgLy8gaGVscGVycyB0byBkbyBhIGNoZWNrIGZvciBgaWYgKG9wdGlvbnMuZm4pYFxuICAgIGlmIChwcm9ncmFtIHx8IGludmVyc2UpIHtcbiAgICAgIGlmICghcHJvZ3JhbSkge1xuICAgICAgICB0aGlzLmNvbnRleHQuYWxpYXNlcy5zZWxmID0gXCJ0aGlzXCI7XG4gICAgICAgIHByb2dyYW0gPSBcInNlbGYubm9vcFwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWludmVyc2UpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmFsaWFzZXMuc2VsZiA9IFwidGhpc1wiO1xuICAgICAgICBpbnZlcnNlID0gXCJzZWxmLm5vb3BcIjtcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucy5wdXNoKFwiaW52ZXJzZTpcIiArIGludmVyc2UpO1xuICAgICAgb3B0aW9ucy5wdXNoKFwiZm46XCIgKyBwcm9ncmFtKTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGk9MDsgaTxwYXJhbVNpemU7IGkrKykge1xuICAgICAgcGFyYW0gPSB0aGlzLnBvcFN0YWNrKCk7XG4gICAgICBwYXJhbXMucHVzaChwYXJhbSk7XG5cbiAgICAgIGlmKHRoaXMub3B0aW9ucy5zdHJpbmdQYXJhbXMpIHtcbiAgICAgICAgdHlwZXMucHVzaCh0aGlzLnBvcFN0YWNrKCkpO1xuICAgICAgICBjb250ZXh0cy5wdXNoKHRoaXMucG9wU3RhY2soKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdHJpbmdQYXJhbXMpIHtcbiAgICAgIG9wdGlvbnMucHVzaChcImNvbnRleHRzOltcIiArIGNvbnRleHRzLmpvaW4oXCIsXCIpICsgXCJdXCIpO1xuICAgICAgb3B0aW9ucy5wdXNoKFwidHlwZXM6W1wiICsgdHlwZXMuam9pbihcIixcIikgKyBcIl1cIik7XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcHRpb25zLmRhdGEpIHtcbiAgICAgIG9wdGlvbnMucHVzaChcImRhdGE6ZGF0YVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfSxcblxuICAvLyB0aGUgcGFyYW1zIGFuZCBjb250ZXh0cyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiBhcnJheXNcbiAgLy8gdG8gZmlsbCBpblxuICBzZXR1cFBhcmFtczogZnVuY3Rpb24ocGFyYW1TaXplLCBwYXJhbXMsIHVzZVJlZ2lzdGVyKSB7XG4gICAgdmFyIG9wdGlvbnMgPSAneycgKyB0aGlzLnNldHVwT3B0aW9ucyhwYXJhbVNpemUsIHBhcmFtcykuam9pbignLCcpICsgJ30nO1xuXG4gICAgaWYgKHVzZVJlZ2lzdGVyKSB7XG4gICAgICB0aGlzLnVzZVJlZ2lzdGVyKCdvcHRpb25zJyk7XG4gICAgICBwYXJhbXMucHVzaCgnb3B0aW9ucycpO1xuICAgICAgcmV0dXJuICdvcHRpb25zPScgKyBvcHRpb25zO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbXMucHVzaChvcHRpb25zKTtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbn07XG5cbnZhciByZXNlcnZlZFdvcmRzID0gKFxuICBcImJyZWFrIGVsc2UgbmV3IHZhclwiICtcbiAgXCIgY2FzZSBmaW5hbGx5IHJldHVybiB2b2lkXCIgK1xuICBcIiBjYXRjaCBmb3Igc3dpdGNoIHdoaWxlXCIgK1xuICBcIiBjb250aW51ZSBmdW5jdGlvbiB0aGlzIHdpdGhcIiArXG4gIFwiIGRlZmF1bHQgaWYgdGhyb3dcIiArXG4gIFwiIGRlbGV0ZSBpbiB0cnlcIiArXG4gIFwiIGRvIGluc3RhbmNlb2YgdHlwZW9mXCIgK1xuICBcIiBhYnN0cmFjdCBlbnVtIGludCBzaG9ydFwiICtcbiAgXCIgYm9vbGVhbiBleHBvcnQgaW50ZXJmYWNlIHN0YXRpY1wiICtcbiAgXCIgYnl0ZSBleHRlbmRzIGxvbmcgc3VwZXJcIiArXG4gIFwiIGNoYXIgZmluYWwgbmF0aXZlIHN5bmNocm9uaXplZFwiICtcbiAgXCIgY2xhc3MgZmxvYXQgcGFja2FnZSB0aHJvd3NcIiArXG4gIFwiIGNvbnN0IGdvdG8gcHJpdmF0ZSB0cmFuc2llbnRcIiArXG4gIFwiIGRlYnVnZ2VyIGltcGxlbWVudHMgcHJvdGVjdGVkIHZvbGF0aWxlXCIgK1xuICBcIiBkb3VibGUgaW1wb3J0IHB1YmxpYyBsZXQgeWllbGRcIlxuKS5zcGxpdChcIiBcIik7XG5cbnZhciBjb21waWxlcldvcmRzID0gSmF2YVNjcmlwdENvbXBpbGVyLlJFU0VSVkVEX1dPUkRTID0ge307XG5cbmZvcih2YXIgaT0wLCBsPXJlc2VydmVkV29yZHMubGVuZ3RoOyBpPGw7IGkrKykge1xuICBjb21waWxlcldvcmRzW3Jlc2VydmVkV29yZHNbaV1dID0gdHJ1ZTtcbn1cblxuSmF2YVNjcmlwdENvbXBpbGVyLmlzVmFsaWRKYXZhU2NyaXB0VmFyaWFibGVOYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICBpZighSmF2YVNjcmlwdENvbXBpbGVyLlJFU0VSVkVEX1dPUkRTW25hbWVdICYmIC9eW2EtekEtWl8kXVswLTlhLXpBLVpfJF0qJC8udGVzdChuYW1lKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gSmF2YVNjcmlwdENvbXBpbGVyOyIsIlwidXNlIHN0cmljdFwiO1xuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuLyogSmlzb24gZ2VuZXJhdGVkIHBhcnNlciAqL1xudmFyIGhhbmRsZWJhcnMgPSAoZnVuY3Rpb24oKXtcbnZhciBwYXJzZXIgPSB7dHJhY2U6IGZ1bmN0aW9uIHRyYWNlKCkgeyB9LFxueXk6IHt9LFxuc3ltYm9sc186IHtcImVycm9yXCI6MixcInJvb3RcIjozLFwic3RhdGVtZW50c1wiOjQsXCJFT0ZcIjo1LFwicHJvZ3JhbVwiOjYsXCJzaW1wbGVJbnZlcnNlXCI6NyxcInN0YXRlbWVudFwiOjgsXCJvcGVuSW52ZXJzZVwiOjksXCJjbG9zZUJsb2NrXCI6MTAsXCJvcGVuQmxvY2tcIjoxMSxcIm11c3RhY2hlXCI6MTIsXCJwYXJ0aWFsXCI6MTMsXCJDT05URU5UXCI6MTQsXCJDT01NRU5UXCI6MTUsXCJPUEVOX0JMT0NLXCI6MTYsXCJzZXhwclwiOjE3LFwiQ0xPU0VcIjoxOCxcIk9QRU5fSU5WRVJTRVwiOjE5LFwiT1BFTl9FTkRCTE9DS1wiOjIwLFwicGF0aFwiOjIxLFwiT1BFTlwiOjIyLFwiT1BFTl9VTkVTQ0FQRURcIjoyMyxcIkNMT1NFX1VORVNDQVBFRFwiOjI0LFwiT1BFTl9QQVJUSUFMXCI6MjUsXCJwYXJ0aWFsTmFtZVwiOjI2LFwicGFydGlhbF9vcHRpb24wXCI6MjcsXCJzZXhwcl9yZXBldGl0aW9uMFwiOjI4LFwic2V4cHJfb3B0aW9uMFwiOjI5LFwiZGF0YU5hbWVcIjozMCxcInBhcmFtXCI6MzEsXCJTVFJJTkdcIjozMixcIklOVEVHRVJcIjozMyxcIkJPT0xFQU5cIjozNCxcIk9QRU5fU0VYUFJcIjozNSxcIkNMT1NFX1NFWFBSXCI6MzYsXCJoYXNoXCI6MzcsXCJoYXNoX3JlcGV0aXRpb25fcGx1czBcIjozOCxcImhhc2hTZWdtZW50XCI6MzksXCJJRFwiOjQwLFwiRVFVQUxTXCI6NDEsXCJEQVRBXCI6NDIsXCJwYXRoU2VnbWVudHNcIjo0MyxcIlNFUFwiOjQ0LFwiJGFjY2VwdFwiOjAsXCIkZW5kXCI6MX0sXG50ZXJtaW5hbHNfOiB7MjpcImVycm9yXCIsNTpcIkVPRlwiLDE0OlwiQ09OVEVOVFwiLDE1OlwiQ09NTUVOVFwiLDE2OlwiT1BFTl9CTE9DS1wiLDE4OlwiQ0xPU0VcIiwxOTpcIk9QRU5fSU5WRVJTRVwiLDIwOlwiT1BFTl9FTkRCTE9DS1wiLDIyOlwiT1BFTlwiLDIzOlwiT1BFTl9VTkVTQ0FQRURcIiwyNDpcIkNMT1NFX1VORVNDQVBFRFwiLDI1OlwiT1BFTl9QQVJUSUFMXCIsMzI6XCJTVFJJTkdcIiwzMzpcIklOVEVHRVJcIiwzNDpcIkJPT0xFQU5cIiwzNTpcIk9QRU5fU0VYUFJcIiwzNjpcIkNMT1NFX1NFWFBSXCIsNDA6XCJJRFwiLDQxOlwiRVFVQUxTXCIsNDI6XCJEQVRBXCIsNDQ6XCJTRVBcIn0sXG5wcm9kdWN0aW9uc186IFswLFszLDJdLFszLDFdLFs2LDJdLFs2LDNdLFs2LDJdLFs2LDFdLFs2LDFdLFs2LDBdLFs0LDFdLFs0LDJdLFs4LDNdLFs4LDNdLFs4LDFdLFs4LDFdLFs4LDFdLFs4LDFdLFsxMSwzXSxbOSwzXSxbMTAsM10sWzEyLDNdLFsxMiwzXSxbMTMsNF0sWzcsMl0sWzE3LDNdLFsxNywxXSxbMzEsMV0sWzMxLDFdLFszMSwxXSxbMzEsMV0sWzMxLDFdLFszMSwzXSxbMzcsMV0sWzM5LDNdLFsyNiwxXSxbMjYsMV0sWzI2LDFdLFszMCwyXSxbMjEsMV0sWzQzLDNdLFs0MywxXSxbMjcsMF0sWzI3LDFdLFsyOCwwXSxbMjgsMl0sWzI5LDBdLFsyOSwxXSxbMzgsMV0sWzM4LDJdXSxcbnBlcmZvcm1BY3Rpb246IGZ1bmN0aW9uIGFub255bW91cyh5eXRleHQseXlsZW5nLHl5bGluZW5vLHl5LHl5c3RhdGUsJCQsXyQpIHtcblxudmFyICQwID0gJCQubGVuZ3RoIC0gMTtcbnN3aXRjaCAoeXlzdGF0ZSkge1xuY2FzZSAxOiByZXR1cm4gbmV3IHl5LlByb2dyYW1Ob2RlKCQkWyQwLTFdLCB0aGlzLl8kKTsgXG5icmVhaztcbmNhc2UgMjogcmV0dXJuIG5ldyB5eS5Qcm9ncmFtTm9kZShbXSwgdGhpcy5fJCk7IFxuYnJlYWs7XG5jYXNlIDM6dGhpcy4kID0gbmV3IHl5LlByb2dyYW1Ob2RlKFtdLCAkJFskMC0xXSwgJCRbJDBdLCB0aGlzLl8kKTtcbmJyZWFrO1xuY2FzZSA0OnRoaXMuJCA9IG5ldyB5eS5Qcm9ncmFtTm9kZSgkJFskMC0yXSwgJCRbJDAtMV0sICQkWyQwXSwgdGhpcy5fJCk7XG5icmVhaztcbmNhc2UgNTp0aGlzLiQgPSBuZXcgeXkuUHJvZ3JhbU5vZGUoJCRbJDAtMV0sICQkWyQwXSwgW10sIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDY6dGhpcy4kID0gbmV3IHl5LlByb2dyYW1Ob2RlKCQkWyQwXSwgdGhpcy5fJCk7XG5icmVhaztcbmNhc2UgNzp0aGlzLiQgPSBuZXcgeXkuUHJvZ3JhbU5vZGUoW10sIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDg6dGhpcy4kID0gbmV3IHl5LlByb2dyYW1Ob2RlKFtdLCB0aGlzLl8kKTtcbmJyZWFrO1xuY2FzZSA5OnRoaXMuJCA9IFskJFskMF1dO1xuYnJlYWs7XG5jYXNlIDEwOiAkJFskMC0xXS5wdXNoKCQkWyQwXSk7IHRoaXMuJCA9ICQkWyQwLTFdOyBcbmJyZWFrO1xuY2FzZSAxMTp0aGlzLiQgPSBuZXcgeXkuQmxvY2tOb2RlKCQkWyQwLTJdLCAkJFskMC0xXS5pbnZlcnNlLCAkJFskMC0xXSwgJCRbJDBdLCB0aGlzLl8kKTtcbmJyZWFrO1xuY2FzZSAxMjp0aGlzLiQgPSBuZXcgeXkuQmxvY2tOb2RlKCQkWyQwLTJdLCAkJFskMC0xXSwgJCRbJDAtMV0uaW52ZXJzZSwgJCRbJDBdLCB0aGlzLl8kKTtcbmJyZWFrO1xuY2FzZSAxMzp0aGlzLiQgPSAkJFskMF07XG5icmVhaztcbmNhc2UgMTQ6dGhpcy4kID0gJCRbJDBdO1xuYnJlYWs7XG5jYXNlIDE1OnRoaXMuJCA9IG5ldyB5eS5Db250ZW50Tm9kZSgkJFskMF0sIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDE2OnRoaXMuJCA9IG5ldyB5eS5Db21tZW50Tm9kZSgkJFskMF0sIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDE3OnRoaXMuJCA9IG5ldyB5eS5NdXN0YWNoZU5vZGUoJCRbJDAtMV0sIG51bGwsICQkWyQwLTJdLCBzdHJpcEZsYWdzKCQkWyQwLTJdLCAkJFskMF0pLCB0aGlzLl8kKTtcbmJyZWFrO1xuY2FzZSAxODp0aGlzLiQgPSBuZXcgeXkuTXVzdGFjaGVOb2RlKCQkWyQwLTFdLCBudWxsLCAkJFskMC0yXSwgc3RyaXBGbGFncygkJFskMC0yXSwgJCRbJDBdKSwgdGhpcy5fJCk7XG5icmVhaztcbmNhc2UgMTk6dGhpcy4kID0ge3BhdGg6ICQkWyQwLTFdLCBzdHJpcDogc3RyaXBGbGFncygkJFskMC0yXSwgJCRbJDBdKX07XG5icmVhaztcbmNhc2UgMjA6dGhpcy4kID0gbmV3IHl5Lk11c3RhY2hlTm9kZSgkJFskMC0xXSwgbnVsbCwgJCRbJDAtMl0sIHN0cmlwRmxhZ3MoJCRbJDAtMl0sICQkWyQwXSksIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDIxOnRoaXMuJCA9IG5ldyB5eS5NdXN0YWNoZU5vZGUoJCRbJDAtMV0sIG51bGwsICQkWyQwLTJdLCBzdHJpcEZsYWdzKCQkWyQwLTJdLCAkJFskMF0pLCB0aGlzLl8kKTtcbmJyZWFrO1xuY2FzZSAyMjp0aGlzLiQgPSBuZXcgeXkuUGFydGlhbE5vZGUoJCRbJDAtMl0sICQkWyQwLTFdLCBzdHJpcEZsYWdzKCQkWyQwLTNdLCAkJFskMF0pLCB0aGlzLl8kKTtcbmJyZWFrO1xuY2FzZSAyMzp0aGlzLiQgPSBzdHJpcEZsYWdzKCQkWyQwLTFdLCAkJFskMF0pO1xuYnJlYWs7XG5jYXNlIDI0OnRoaXMuJCA9IG5ldyB5eS5TZXhwck5vZGUoWyQkWyQwLTJdXS5jb25jYXQoJCRbJDAtMV0pLCAkJFskMF0sIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDI1OnRoaXMuJCA9IG5ldyB5eS5TZXhwck5vZGUoWyQkWyQwXV0sIG51bGwsIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDI2OnRoaXMuJCA9ICQkWyQwXTtcbmJyZWFrO1xuY2FzZSAyNzp0aGlzLiQgPSBuZXcgeXkuU3RyaW5nTm9kZSgkJFskMF0sIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDI4OnRoaXMuJCA9IG5ldyB5eS5JbnRlZ2VyTm9kZSgkJFskMF0sIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDI5OnRoaXMuJCA9IG5ldyB5eS5Cb29sZWFuTm9kZSgkJFskMF0sIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDMwOnRoaXMuJCA9ICQkWyQwXTtcbmJyZWFrO1xuY2FzZSAzMTokJFskMC0xXS5pc0hlbHBlciA9IHRydWU7IHRoaXMuJCA9ICQkWyQwLTFdO1xuYnJlYWs7XG5jYXNlIDMyOnRoaXMuJCA9IG5ldyB5eS5IYXNoTm9kZSgkJFskMF0sIHRoaXMuXyQpO1xuYnJlYWs7XG5jYXNlIDMzOnRoaXMuJCA9IFskJFskMC0yXSwgJCRbJDBdXTtcbmJyZWFrO1xuY2FzZSAzNDp0aGlzLiQgPSBuZXcgeXkuUGFydGlhbE5hbWVOb2RlKCQkWyQwXSwgdGhpcy5fJCk7XG5icmVhaztcbmNhc2UgMzU6dGhpcy4kID0gbmV3IHl5LlBhcnRpYWxOYW1lTm9kZShuZXcgeXkuU3RyaW5nTm9kZSgkJFskMF0sIHRoaXMuXyQpLCB0aGlzLl8kKTtcbmJyZWFrO1xuY2FzZSAzNjp0aGlzLiQgPSBuZXcgeXkuUGFydGlhbE5hbWVOb2RlKG5ldyB5eS5JbnRlZ2VyTm9kZSgkJFskMF0sIHRoaXMuXyQpKTtcbmJyZWFrO1xuY2FzZSAzNzp0aGlzLiQgPSBuZXcgeXkuRGF0YU5vZGUoJCRbJDBdLCB0aGlzLl8kKTtcbmJyZWFrO1xuY2FzZSAzODp0aGlzLiQgPSBuZXcgeXkuSWROb2RlKCQkWyQwXSwgdGhpcy5fJCk7XG5icmVhaztcbmNhc2UgMzk6ICQkWyQwLTJdLnB1c2goe3BhcnQ6ICQkWyQwXSwgc2VwYXJhdG9yOiAkJFskMC0xXX0pOyB0aGlzLiQgPSAkJFskMC0yXTsgXG5icmVhaztcbmNhc2UgNDA6dGhpcy4kID0gW3twYXJ0OiAkJFskMF19XTtcbmJyZWFrO1xuY2FzZSA0Mzp0aGlzLiQgPSBbXTtcbmJyZWFrO1xuY2FzZSA0NDokJFskMC0xXS5wdXNoKCQkWyQwXSk7XG5icmVhaztcbmNhc2UgNDc6dGhpcy4kID0gWyQkWyQwXV07XG5icmVhaztcbmNhc2UgNDg6JCRbJDAtMV0ucHVzaCgkJFskMF0pO1xuYnJlYWs7XG59XG59LFxudGFibGU6IFt7MzoxLDQ6Miw1OlsxLDNdLDg6NCw5OjUsMTE6NiwxMjo3LDEzOjgsMTQ6WzEsOV0sMTU6WzEsMTBdLDE2OlsxLDEyXSwxOTpbMSwxMV0sMjI6WzEsMTNdLDIzOlsxLDE0XSwyNTpbMSwxNV19LHsxOlszXX0sezU6WzEsMTZdLDg6MTcsOTo1LDExOjYsMTI6NywxMzo4LDE0OlsxLDldLDE1OlsxLDEwXSwxNjpbMSwxMl0sMTk6WzEsMTFdLDIyOlsxLDEzXSwyMzpbMSwxNF0sMjU6WzEsMTVdfSx7MTpbMiwyXX0sezU6WzIsOV0sMTQ6WzIsOV0sMTU6WzIsOV0sMTY6WzIsOV0sMTk6WzIsOV0sMjA6WzIsOV0sMjI6WzIsOV0sMjM6WzIsOV0sMjU6WzIsOV19LHs0OjIwLDY6MTgsNzoxOSw4OjQsOTo1LDExOjYsMTI6NywxMzo4LDE0OlsxLDldLDE1OlsxLDEwXSwxNjpbMSwxMl0sMTk6WzEsMjFdLDIwOlsyLDhdLDIyOlsxLDEzXSwyMzpbMSwxNF0sMjU6WzEsMTVdfSx7NDoyMCw2OjIyLDc6MTksODo0LDk6NSwxMTo2LDEyOjcsMTM6OCwxNDpbMSw5XSwxNTpbMSwxMF0sMTY6WzEsMTJdLDE5OlsxLDIxXSwyMDpbMiw4XSwyMjpbMSwxM10sMjM6WzEsMTRdLDI1OlsxLDE1XX0sezU6WzIsMTNdLDE0OlsyLDEzXSwxNTpbMiwxM10sMTY6WzIsMTNdLDE5OlsyLDEzXSwyMDpbMiwxM10sMjI6WzIsMTNdLDIzOlsyLDEzXSwyNTpbMiwxM119LHs1OlsyLDE0XSwxNDpbMiwxNF0sMTU6WzIsMTRdLDE2OlsyLDE0XSwxOTpbMiwxNF0sMjA6WzIsMTRdLDIyOlsyLDE0XSwyMzpbMiwxNF0sMjU6WzIsMTRdfSx7NTpbMiwxNV0sMTQ6WzIsMTVdLDE1OlsyLDE1XSwxNjpbMiwxNV0sMTk6WzIsMTVdLDIwOlsyLDE1XSwyMjpbMiwxNV0sMjM6WzIsMTVdLDI1OlsyLDE1XX0sezU6WzIsMTZdLDE0OlsyLDE2XSwxNTpbMiwxNl0sMTY6WzIsMTZdLDE5OlsyLDE2XSwyMDpbMiwxNl0sMjI6WzIsMTZdLDIzOlsyLDE2XSwyNTpbMiwxNl19LHsxNzoyMywyMToyNCwzMDoyNSw0MDpbMSwyOF0sNDI6WzEsMjddLDQzOjI2fSx7MTc6MjksMjE6MjQsMzA6MjUsNDA6WzEsMjhdLDQyOlsxLDI3XSw0MzoyNn0sezE3OjMwLDIxOjI0LDMwOjI1LDQwOlsxLDI4XSw0MjpbMSwyN10sNDM6MjZ9LHsxNzozMSwyMToyNCwzMDoyNSw0MDpbMSwyOF0sNDI6WzEsMjddLDQzOjI2fSx7MjE6MzMsMjY6MzIsMzI6WzEsMzRdLDMzOlsxLDM1XSw0MDpbMSwyOF0sNDM6MjZ9LHsxOlsyLDFdfSx7NTpbMiwxMF0sMTQ6WzIsMTBdLDE1OlsyLDEwXSwxNjpbMiwxMF0sMTk6WzIsMTBdLDIwOlsyLDEwXSwyMjpbMiwxMF0sMjM6WzIsMTBdLDI1OlsyLDEwXX0sezEwOjM2LDIwOlsxLDM3XX0sezQ6MzgsODo0LDk6NSwxMTo2LDEyOjcsMTM6OCwxNDpbMSw5XSwxNTpbMSwxMF0sMTY6WzEsMTJdLDE5OlsxLDExXSwyMDpbMiw3XSwyMjpbMSwxM10sMjM6WzEsMTRdLDI1OlsxLDE1XX0sezc6MzksODoxNyw5OjUsMTE6NiwxMjo3LDEzOjgsMTQ6WzEsOV0sMTU6WzEsMTBdLDE2OlsxLDEyXSwxOTpbMSwyMV0sMjA6WzIsNl0sMjI6WzEsMTNdLDIzOlsxLDE0XSwyNTpbMSwxNV19LHsxNzoyMywxODpbMSw0MF0sMjE6MjQsMzA6MjUsNDA6WzEsMjhdLDQyOlsxLDI3XSw0MzoyNn0sezEwOjQxLDIwOlsxLDM3XX0sezE4OlsxLDQyXX0sezE4OlsyLDQzXSwyNDpbMiw0M10sMjg6NDMsMzI6WzIsNDNdLDMzOlsyLDQzXSwzNDpbMiw0M10sMzU6WzIsNDNdLDM2OlsyLDQzXSw0MDpbMiw0M10sNDI6WzIsNDNdfSx7MTg6WzIsMjVdLDI0OlsyLDI1XSwzNjpbMiwyNV19LHsxODpbMiwzOF0sMjQ6WzIsMzhdLDMyOlsyLDM4XSwzMzpbMiwzOF0sMzQ6WzIsMzhdLDM1OlsyLDM4XSwzNjpbMiwzOF0sNDA6WzIsMzhdLDQyOlsyLDM4XSw0NDpbMSw0NF19LHsyMTo0NSw0MDpbMSwyOF0sNDM6MjZ9LHsxODpbMiw0MF0sMjQ6WzIsNDBdLDMyOlsyLDQwXSwzMzpbMiw0MF0sMzQ6WzIsNDBdLDM1OlsyLDQwXSwzNjpbMiw0MF0sNDA6WzIsNDBdLDQyOlsyLDQwXSw0NDpbMiw0MF19LHsxODpbMSw0Nl19LHsxODpbMSw0N119LHsyNDpbMSw0OF19LHsxODpbMiw0MV0sMjE6NTAsMjc6NDksNDA6WzEsMjhdLDQzOjI2fSx7MTg6WzIsMzRdLDQwOlsyLDM0XX0sezE4OlsyLDM1XSw0MDpbMiwzNV19LHsxODpbMiwzNl0sNDA6WzIsMzZdfSx7NTpbMiwxMV0sMTQ6WzIsMTFdLDE1OlsyLDExXSwxNjpbMiwxMV0sMTk6WzIsMTFdLDIwOlsyLDExXSwyMjpbMiwxMV0sMjM6WzIsMTFdLDI1OlsyLDExXX0sezIxOjUxLDQwOlsxLDI4XSw0MzoyNn0sezg6MTcsOTo1LDExOjYsMTI6NywxMzo4LDE0OlsxLDldLDE1OlsxLDEwXSwxNjpbMSwxMl0sMTk6WzEsMTFdLDIwOlsyLDNdLDIyOlsxLDEzXSwyMzpbMSwxNF0sMjU6WzEsMTVdfSx7NDo1Miw4OjQsOTo1LDExOjYsMTI6NywxMzo4LDE0OlsxLDldLDE1OlsxLDEwXSwxNjpbMSwxMl0sMTk6WzEsMTFdLDIwOlsyLDVdLDIyOlsxLDEzXSwyMzpbMSwxNF0sMjU6WzEsMTVdfSx7MTQ6WzIsMjNdLDE1OlsyLDIzXSwxNjpbMiwyM10sMTk6WzIsMjNdLDIwOlsyLDIzXSwyMjpbMiwyM10sMjM6WzIsMjNdLDI1OlsyLDIzXX0sezU6WzIsMTJdLDE0OlsyLDEyXSwxNTpbMiwxMl0sMTY6WzIsMTJdLDE5OlsyLDEyXSwyMDpbMiwxMl0sMjI6WzIsMTJdLDIzOlsyLDEyXSwyNTpbMiwxMl19LHsxNDpbMiwxOF0sMTU6WzIsMThdLDE2OlsyLDE4XSwxOTpbMiwxOF0sMjA6WzIsMThdLDIyOlsyLDE4XSwyMzpbMiwxOF0sMjU6WzIsMThdfSx7MTg6WzIsNDVdLDIxOjU2LDI0OlsyLDQ1XSwyOTo1MywzMDo2MCwzMTo1NCwzMjpbMSw1N10sMzM6WzEsNThdLDM0OlsxLDU5XSwzNTpbMSw2MV0sMzY6WzIsNDVdLDM3OjU1LDM4OjYyLDM5OjYzLDQwOlsxLDY0XSw0MjpbMSwyN10sNDM6MjZ9LHs0MDpbMSw2NV19LHsxODpbMiwzN10sMjQ6WzIsMzddLDMyOlsyLDM3XSwzMzpbMiwzN10sMzQ6WzIsMzddLDM1OlsyLDM3XSwzNjpbMiwzN10sNDA6WzIsMzddLDQyOlsyLDM3XX0sezE0OlsyLDE3XSwxNTpbMiwxN10sMTY6WzIsMTddLDE5OlsyLDE3XSwyMDpbMiwxN10sMjI6WzIsMTddLDIzOlsyLDE3XSwyNTpbMiwxN119LHs1OlsyLDIwXSwxNDpbMiwyMF0sMTU6WzIsMjBdLDE2OlsyLDIwXSwxOTpbMiwyMF0sMjA6WzIsMjBdLDIyOlsyLDIwXSwyMzpbMiwyMF0sMjU6WzIsMjBdfSx7NTpbMiwyMV0sMTQ6WzIsMjFdLDE1OlsyLDIxXSwxNjpbMiwyMV0sMTk6WzIsMjFdLDIwOlsyLDIxXSwyMjpbMiwyMV0sMjM6WzIsMjFdLDI1OlsyLDIxXX0sezE4OlsxLDY2XX0sezE4OlsyLDQyXX0sezE4OlsxLDY3XX0sezg6MTcsOTo1LDExOjYsMTI6NywxMzo4LDE0OlsxLDldLDE1OlsxLDEwXSwxNjpbMSwxMl0sMTk6WzEsMTFdLDIwOlsyLDRdLDIyOlsxLDEzXSwyMzpbMSwxNF0sMjU6WzEsMTVdfSx7MTg6WzIsMjRdLDI0OlsyLDI0XSwzNjpbMiwyNF19LHsxODpbMiw0NF0sMjQ6WzIsNDRdLDMyOlsyLDQ0XSwzMzpbMiw0NF0sMzQ6WzIsNDRdLDM1OlsyLDQ0XSwzNjpbMiw0NF0sNDA6WzIsNDRdLDQyOlsyLDQ0XX0sezE4OlsyLDQ2XSwyNDpbMiw0Nl0sMzY6WzIsNDZdfSx7MTg6WzIsMjZdLDI0OlsyLDI2XSwzMjpbMiwyNl0sMzM6WzIsMjZdLDM0OlsyLDI2XSwzNTpbMiwyNl0sMzY6WzIsMjZdLDQwOlsyLDI2XSw0MjpbMiwyNl19LHsxODpbMiwyN10sMjQ6WzIsMjddLDMyOlsyLDI3XSwzMzpbMiwyN10sMzQ6WzIsMjddLDM1OlsyLDI3XSwzNjpbMiwyN10sNDA6WzIsMjddLDQyOlsyLDI3XX0sezE4OlsyLDI4XSwyNDpbMiwyOF0sMzI6WzIsMjhdLDMzOlsyLDI4XSwzNDpbMiwyOF0sMzU6WzIsMjhdLDM2OlsyLDI4XSw0MDpbMiwyOF0sNDI6WzIsMjhdfSx7MTg6WzIsMjldLDI0OlsyLDI5XSwzMjpbMiwyOV0sMzM6WzIsMjldLDM0OlsyLDI5XSwzNTpbMiwyOV0sMzY6WzIsMjldLDQwOlsyLDI5XSw0MjpbMiwyOV19LHsxODpbMiwzMF0sMjQ6WzIsMzBdLDMyOlsyLDMwXSwzMzpbMiwzMF0sMzQ6WzIsMzBdLDM1OlsyLDMwXSwzNjpbMiwzMF0sNDA6WzIsMzBdLDQyOlsyLDMwXX0sezE3OjY4LDIxOjI0LDMwOjI1LDQwOlsxLDI4XSw0MjpbMSwyN10sNDM6MjZ9LHsxODpbMiwzMl0sMjQ6WzIsMzJdLDM2OlsyLDMyXSwzOTo2OSw0MDpbMSw3MF19LHsxODpbMiw0N10sMjQ6WzIsNDddLDM2OlsyLDQ3XSw0MDpbMiw0N119LHsxODpbMiw0MF0sMjQ6WzIsNDBdLDMyOlsyLDQwXSwzMzpbMiw0MF0sMzQ6WzIsNDBdLDM1OlsyLDQwXSwzNjpbMiw0MF0sNDA6WzIsNDBdLDQxOlsxLDcxXSw0MjpbMiw0MF0sNDQ6WzIsNDBdfSx7MTg6WzIsMzldLDI0OlsyLDM5XSwzMjpbMiwzOV0sMzM6WzIsMzldLDM0OlsyLDM5XSwzNTpbMiwzOV0sMzY6WzIsMzldLDQwOlsyLDM5XSw0MjpbMiwzOV0sNDQ6WzIsMzldfSx7NTpbMiwyMl0sMTQ6WzIsMjJdLDE1OlsyLDIyXSwxNjpbMiwyMl0sMTk6WzIsMjJdLDIwOlsyLDIyXSwyMjpbMiwyMl0sMjM6WzIsMjJdLDI1OlsyLDIyXX0sezU6WzIsMTldLDE0OlsyLDE5XSwxNTpbMiwxOV0sMTY6WzIsMTldLDE5OlsyLDE5XSwyMDpbMiwxOV0sMjI6WzIsMTldLDIzOlsyLDE5XSwyNTpbMiwxOV19LHszNjpbMSw3Ml19LHsxODpbMiw0OF0sMjQ6WzIsNDhdLDM2OlsyLDQ4XSw0MDpbMiw0OF19LHs0MTpbMSw3MV19LHsyMTo1NiwzMDo2MCwzMTo3MywzMjpbMSw1N10sMzM6WzEsNThdLDM0OlsxLDU5XSwzNTpbMSw2MV0sNDA6WzEsMjhdLDQyOlsxLDI3XSw0MzoyNn0sezE4OlsyLDMxXSwyNDpbMiwzMV0sMzI6WzIsMzFdLDMzOlsyLDMxXSwzNDpbMiwzMV0sMzU6WzIsMzFdLDM2OlsyLDMxXSw0MDpbMiwzMV0sNDI6WzIsMzFdfSx7MTg6WzIsMzNdLDI0OlsyLDMzXSwzNjpbMiwzM10sNDA6WzIsMzNdfV0sXG5kZWZhdWx0QWN0aW9uczogezM6WzIsMl0sMTY6WzIsMV0sNTA6WzIsNDJdfSxcbnBhcnNlRXJyb3I6IGZ1bmN0aW9uIHBhcnNlRXJyb3Ioc3RyLCBoYXNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHN0cik7XG59LFxucGFyc2U6IGZ1bmN0aW9uIHBhcnNlKGlucHV0KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLCBzdGFjayA9IFswXSwgdnN0YWNrID0gW251bGxdLCBsc3RhY2sgPSBbXSwgdGFibGUgPSB0aGlzLnRhYmxlLCB5eXRleHQgPSBcIlwiLCB5eWxpbmVubyA9IDAsIHl5bGVuZyA9IDAsIHJlY292ZXJpbmcgPSAwLCBURVJST1IgPSAyLCBFT0YgPSAxO1xuICAgIHRoaXMubGV4ZXIuc2V0SW5wdXQoaW5wdXQpO1xuICAgIHRoaXMubGV4ZXIueXkgPSB0aGlzLnl5O1xuICAgIHRoaXMueXkubGV4ZXIgPSB0aGlzLmxleGVyO1xuICAgIHRoaXMueXkucGFyc2VyID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHRoaXMubGV4ZXIueXlsbG9jID09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIHRoaXMubGV4ZXIueXlsbG9jID0ge307XG4gICAgdmFyIHl5bG9jID0gdGhpcy5sZXhlci55eWxsb2M7XG4gICAgbHN0YWNrLnB1c2goeXlsb2MpO1xuICAgIHZhciByYW5nZXMgPSB0aGlzLmxleGVyLm9wdGlvbnMgJiYgdGhpcy5sZXhlci5vcHRpb25zLnJhbmdlcztcbiAgICBpZiAodHlwZW9mIHRoaXMueXkucGFyc2VFcnJvciA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aGlzLnBhcnNlRXJyb3IgPSB0aGlzLnl5LnBhcnNlRXJyb3I7XG4gICAgZnVuY3Rpb24gcG9wU3RhY2sobikge1xuICAgICAgICBzdGFjay5sZW5ndGggPSBzdGFjay5sZW5ndGggLSAyICogbjtcbiAgICAgICAgdnN0YWNrLmxlbmd0aCA9IHZzdGFjay5sZW5ndGggLSBuO1xuICAgICAgICBsc3RhY2subGVuZ3RoID0gbHN0YWNrLmxlbmd0aCAtIG47XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxleCgpIHtcbiAgICAgICAgdmFyIHRva2VuO1xuICAgICAgICB0b2tlbiA9IHNlbGYubGV4ZXIubGV4KCkgfHwgMTtcbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdG9rZW4gPSBzZWxmLnN5bWJvbHNfW3Rva2VuXSB8fCB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICAgIHZhciBzeW1ib2wsIHByZUVycm9yU3ltYm9sLCBzdGF0ZSwgYWN0aW9uLCBhLCByLCB5eXZhbCA9IHt9LCBwLCBsZW4sIG5ld1N0YXRlLCBleHBlY3RlZDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBzdGF0ZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAodGhpcy5kZWZhdWx0QWN0aW9uc1tzdGF0ZV0pIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IHRoaXMuZGVmYXVsdEFjdGlvbnNbc3RhdGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHN5bWJvbCA9PT0gbnVsbCB8fCB0eXBlb2Ygc3ltYm9sID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSBsZXgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjdGlvbiA9IHRhYmxlW3N0YXRlXSAmJiB0YWJsZVtzdGF0ZV1bc3ltYm9sXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhYWN0aW9uLmxlbmd0aCB8fCAhYWN0aW9uWzBdKSB7XG4gICAgICAgICAgICB2YXIgZXJyU3RyID0gXCJcIjtcbiAgICAgICAgICAgIGlmICghcmVjb3ZlcmluZykge1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChwIGluIHRhYmxlW3N0YXRlXSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGVybWluYWxzX1twXSAmJiBwID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQucHVzaChcIidcIiArIHRoaXMudGVybWluYWxzX1twXSArIFwiJ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxleGVyLnNob3dQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBlcnJTdHIgPSBcIlBhcnNlIGVycm9yIG9uIGxpbmUgXCIgKyAoeXlsaW5lbm8gKyAxKSArIFwiOlxcblwiICsgdGhpcy5sZXhlci5zaG93UG9zaXRpb24oKSArIFwiXFxuRXhwZWN0aW5nIFwiICsgZXhwZWN0ZWQuam9pbihcIiwgXCIpICsgXCIsIGdvdCAnXCIgKyAodGhpcy50ZXJtaW5hbHNfW3N5bWJvbF0gfHwgc3ltYm9sKSArIFwiJ1wiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVyclN0ciA9IFwiUGFyc2UgZXJyb3Igb24gbGluZSBcIiArICh5eWxpbmVubyArIDEpICsgXCI6IFVuZXhwZWN0ZWQgXCIgKyAoc3ltYm9sID09IDE/XCJlbmQgb2YgaW5wdXRcIjpcIidcIiArICh0aGlzLnRlcm1pbmFsc19bc3ltYm9sXSB8fCBzeW1ib2wpICsgXCInXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlRXJyb3IoZXJyU3RyLCB7dGV4dDogdGhpcy5sZXhlci5tYXRjaCwgdG9rZW46IHRoaXMudGVybWluYWxzX1tzeW1ib2xdIHx8IHN5bWJvbCwgbGluZTogdGhpcy5sZXhlci55eWxpbmVubywgbG9jOiB5eWxvYywgZXhwZWN0ZWQ6IGV4cGVjdGVkfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvblswXSBpbnN0YW5jZW9mIEFycmF5ICYmIGFjdGlvbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZSBFcnJvcjogbXVsdGlwbGUgYWN0aW9ucyBwb3NzaWJsZSBhdCBzdGF0ZTogXCIgKyBzdGF0ZSArIFwiLCB0b2tlbjogXCIgKyBzeW1ib2wpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uWzBdKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHN0YWNrLnB1c2goc3ltYm9sKTtcbiAgICAgICAgICAgIHZzdGFjay5wdXNoKHRoaXMubGV4ZXIueXl0ZXh0KTtcbiAgICAgICAgICAgIGxzdGFjay5wdXNoKHRoaXMubGV4ZXIueXlsbG9jKTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2goYWN0aW9uWzFdKTtcbiAgICAgICAgICAgIHN5bWJvbCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoIXByZUVycm9yU3ltYm9sKSB7XG4gICAgICAgICAgICAgICAgeXlsZW5nID0gdGhpcy5sZXhlci55eWxlbmc7XG4gICAgICAgICAgICAgICAgeXl0ZXh0ID0gdGhpcy5sZXhlci55eXRleHQ7XG4gICAgICAgICAgICAgICAgeXlsaW5lbm8gPSB0aGlzLmxleGVyLnl5bGluZW5vO1xuICAgICAgICAgICAgICAgIHl5bG9jID0gdGhpcy5sZXhlci55eWxsb2M7XG4gICAgICAgICAgICAgICAgaWYgKHJlY292ZXJpbmcgPiAwKVxuICAgICAgICAgICAgICAgICAgICByZWNvdmVyaW5nLS07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN5bWJvbCA9IHByZUVycm9yU3ltYm9sO1xuICAgICAgICAgICAgICAgIHByZUVycm9yU3ltYm9sID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBsZW4gPSB0aGlzLnByb2R1Y3Rpb25zX1thY3Rpb25bMV1dWzFdO1xuICAgICAgICAgICAgeXl2YWwuJCA9IHZzdGFja1t2c3RhY2subGVuZ3RoIC0gbGVuXTtcbiAgICAgICAgICAgIHl5dmFsLl8kID0ge2ZpcnN0X2xpbmU6IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gKGxlbiB8fCAxKV0uZmlyc3RfbGluZSwgbGFzdF9saW5lOiBsc3RhY2tbbHN0YWNrLmxlbmd0aCAtIDFdLmxhc3RfbGluZSwgZmlyc3RfY29sdW1uOiBsc3RhY2tbbHN0YWNrLmxlbmd0aCAtIChsZW4gfHwgMSldLmZpcnN0X2NvbHVtbiwgbGFzdF9jb2x1bW46IGxzdGFja1tsc3RhY2subGVuZ3RoIC0gMV0ubGFzdF9jb2x1bW59O1xuICAgICAgICAgICAgaWYgKHJhbmdlcykge1xuICAgICAgICAgICAgICAgIHl5dmFsLl8kLnJhbmdlID0gW2xzdGFja1tsc3RhY2subGVuZ3RoIC0gKGxlbiB8fCAxKV0ucmFuZ2VbMF0sIGxzdGFja1tsc3RhY2subGVuZ3RoIC0gMV0ucmFuZ2VbMV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgciA9IHRoaXMucGVyZm9ybUFjdGlvbi5jYWxsKHl5dmFsLCB5eXRleHQsIHl5bGVuZywgeXlsaW5lbm8sIHRoaXMueXksIGFjdGlvblsxXSwgdnN0YWNrLCBsc3RhY2spO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVuKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sgPSBzdGFjay5zbGljZSgwLCAtMSAqIGxlbiAqIDIpO1xuICAgICAgICAgICAgICAgIHZzdGFjayA9IHZzdGFjay5zbGljZSgwLCAtMSAqIGxlbik7XG4gICAgICAgICAgICAgICAgbHN0YWNrID0gbHN0YWNrLnNsaWNlKDAsIC0xICogbGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YWNrLnB1c2godGhpcy5wcm9kdWN0aW9uc19bYWN0aW9uWzFdXVswXSk7XG4gICAgICAgICAgICB2c3RhY2sucHVzaCh5eXZhbC4kKTtcbiAgICAgICAgICAgIGxzdGFjay5wdXNoKHl5dmFsLl8kKTtcbiAgICAgICAgICAgIG5ld1N0YXRlID0gdGFibGVbc3RhY2tbc3RhY2subGVuZ3RoIC0gMl1dW3N0YWNrW3N0YWNrLmxlbmd0aCAtIDFdXTtcbiAgICAgICAgICAgIHN0YWNrLnB1c2gobmV3U3RhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxufTtcblxuXG5mdW5jdGlvbiBzdHJpcEZsYWdzKG9wZW4sIGNsb3NlKSB7XG4gIHJldHVybiB7XG4gICAgbGVmdDogb3Blbi5jaGFyQXQoMikgPT09ICd+JyxcbiAgICByaWdodDogY2xvc2UuY2hhckF0KDApID09PSAnficgfHwgY2xvc2UuY2hhckF0KDEpID09PSAnfidcbiAgfTtcbn1cblxuLyogSmlzb24gZ2VuZXJhdGVkIGxleGVyICovXG52YXIgbGV4ZXIgPSAoZnVuY3Rpb24oKXtcbnZhciBsZXhlciA9ICh7RU9GOjEsXG5wYXJzZUVycm9yOmZ1bmN0aW9uIHBhcnNlRXJyb3Ioc3RyLCBoYXNoKSB7XG4gICAgICAgIGlmICh0aGlzLnl5LnBhcnNlcikge1xuICAgICAgICAgICAgdGhpcy55eS5wYXJzZXIucGFyc2VFcnJvcihzdHIsIGhhc2gpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHN0cik7XG4gICAgICAgIH1cbiAgICB9LFxuc2V0SW5wdXQ6ZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gaW5wdXQ7XG4gICAgICAgIHRoaXMuX21vcmUgPSB0aGlzLl9sZXNzID0gdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICAgIHRoaXMueXlsaW5lbm8gPSB0aGlzLnl5bGVuZyA9IDA7XG4gICAgICAgIHRoaXMueXl0ZXh0ID0gdGhpcy5tYXRjaGVkID0gdGhpcy5tYXRjaCA9ICcnO1xuICAgICAgICB0aGlzLmNvbmRpdGlvblN0YWNrID0gWydJTklUSUFMJ107XG4gICAgICAgIHRoaXMueXlsbG9jID0ge2ZpcnN0X2xpbmU6MSxmaXJzdF9jb2x1bW46MCxsYXN0X2xpbmU6MSxsYXN0X2NvbHVtbjowfTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYW5nZXMpIHRoaXMueXlsbG9jLnJhbmdlID0gWzAsMF07XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbmlucHV0OmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoID0gdGhpcy5faW5wdXRbMF07XG4gICAgICAgIHRoaXMueXl0ZXh0ICs9IGNoO1xuICAgICAgICB0aGlzLnl5bGVuZysrO1xuICAgICAgICB0aGlzLm9mZnNldCsrO1xuICAgICAgICB0aGlzLm1hdGNoICs9IGNoO1xuICAgICAgICB0aGlzLm1hdGNoZWQgKz0gY2g7XG4gICAgICAgIHZhciBsaW5lcyA9IGNoLm1hdGNoKC8oPzpcXHJcXG4/fFxcbikuKi9nKTtcbiAgICAgICAgaWYgKGxpbmVzKSB7XG4gICAgICAgICAgICB0aGlzLnl5bGluZW5vKys7XG4gICAgICAgICAgICB0aGlzLnl5bGxvYy5sYXN0X2xpbmUrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueXlsbG9jLmxhc3RfY29sdW1uKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYW5nZXMpIHRoaXMueXlsbG9jLnJhbmdlWzFdKys7XG5cbiAgICAgICAgdGhpcy5faW5wdXQgPSB0aGlzLl9pbnB1dC5zbGljZSgxKTtcbiAgICAgICAgcmV0dXJuIGNoO1xuICAgIH0sXG51bnB1dDpmdW5jdGlvbiAoY2gpIHtcbiAgICAgICAgdmFyIGxlbiA9IGNoLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpbmVzID0gY2guc3BsaXQoLyg/Olxcclxcbj98XFxuKS9nKTtcblxuICAgICAgICB0aGlzLl9pbnB1dCA9IGNoICsgdGhpcy5faW5wdXQ7XG4gICAgICAgIHRoaXMueXl0ZXh0ID0gdGhpcy55eXRleHQuc3Vic3RyKDAsIHRoaXMueXl0ZXh0Lmxlbmd0aC1sZW4tMSk7XG4gICAgICAgIC8vdGhpcy55eWxlbmcgLT0gbGVuO1xuICAgICAgICB0aGlzLm9mZnNldCAtPSBsZW47XG4gICAgICAgIHZhciBvbGRMaW5lcyA9IHRoaXMubWF0Y2guc3BsaXQoLyg/Olxcclxcbj98XFxuKS9nKTtcbiAgICAgICAgdGhpcy5tYXRjaCA9IHRoaXMubWF0Y2guc3Vic3RyKDAsIHRoaXMubWF0Y2gubGVuZ3RoLTEpO1xuICAgICAgICB0aGlzLm1hdGNoZWQgPSB0aGlzLm1hdGNoZWQuc3Vic3RyKDAsIHRoaXMubWF0Y2hlZC5sZW5ndGgtMSk7XG5cbiAgICAgICAgaWYgKGxpbmVzLmxlbmd0aC0xKSB0aGlzLnl5bGluZW5vIC09IGxpbmVzLmxlbmd0aC0xO1xuICAgICAgICB2YXIgciA9IHRoaXMueXlsbG9jLnJhbmdlO1xuXG4gICAgICAgIHRoaXMueXlsbG9jID0ge2ZpcnN0X2xpbmU6IHRoaXMueXlsbG9jLmZpcnN0X2xpbmUsXG4gICAgICAgICAgbGFzdF9saW5lOiB0aGlzLnl5bGluZW5vKzEsXG4gICAgICAgICAgZmlyc3RfY29sdW1uOiB0aGlzLnl5bGxvYy5maXJzdF9jb2x1bW4sXG4gICAgICAgICAgbGFzdF9jb2x1bW46IGxpbmVzID9cbiAgICAgICAgICAgICAgKGxpbmVzLmxlbmd0aCA9PT0gb2xkTGluZXMubGVuZ3RoID8gdGhpcy55eWxsb2MuZmlyc3RfY29sdW1uIDogMCkgKyBvbGRMaW5lc1tvbGRMaW5lcy5sZW5ndGggLSBsaW5lcy5sZW5ndGhdLmxlbmd0aCAtIGxpbmVzWzBdLmxlbmd0aDpcbiAgICAgICAgICAgICAgdGhpcy55eWxsb2MuZmlyc3RfY29sdW1uIC0gbGVuXG4gICAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJhbmdlcykge1xuICAgICAgICAgICAgdGhpcy55eWxsb2MucmFuZ2UgPSBbclswXSwgclswXSArIHRoaXMueXlsZW5nIC0gbGVuXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxubW9yZTpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX21vcmUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxubGVzczpmdW5jdGlvbiAobikge1xuICAgICAgICB0aGlzLnVucHV0KHRoaXMubWF0Y2guc2xpY2UobikpO1xuICAgIH0sXG5wYXN0SW5wdXQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFzdCA9IHRoaXMubWF0Y2hlZC5zdWJzdHIoMCwgdGhpcy5tYXRjaGVkLmxlbmd0aCAtIHRoaXMubWF0Y2gubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIChwYXN0Lmxlbmd0aCA+IDIwID8gJy4uLic6JycpICsgcGFzdC5zdWJzdHIoLTIwKS5yZXBsYWNlKC9cXG4vZywgXCJcIik7XG4gICAgfSxcbnVwY29taW5nSW5wdXQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV4dCA9IHRoaXMubWF0Y2g7XG4gICAgICAgIGlmIChuZXh0Lmxlbmd0aCA8IDIwKSB7XG4gICAgICAgICAgICBuZXh0ICs9IHRoaXMuX2lucHV0LnN1YnN0cigwLCAyMC1uZXh0Lmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChuZXh0LnN1YnN0cigwLDIwKSsobmV4dC5sZW5ndGggPiAyMCA/ICcuLi4nOicnKSkucmVwbGFjZSgvXFxuL2csIFwiXCIpO1xuICAgIH0sXG5zaG93UG9zaXRpb246ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJlID0gdGhpcy5wYXN0SW5wdXQoKTtcbiAgICAgICAgdmFyIGMgPSBuZXcgQXJyYXkocHJlLmxlbmd0aCArIDEpLmpvaW4oXCItXCIpO1xuICAgICAgICByZXR1cm4gcHJlICsgdGhpcy51cGNvbWluZ0lucHV0KCkgKyBcIlxcblwiICsgYytcIl5cIjtcbiAgICB9LFxubmV4dDpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkVPRjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2lucHV0KSB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICAgIHZhciB0b2tlbixcbiAgICAgICAgICAgIG1hdGNoLFxuICAgICAgICAgICAgdGVtcE1hdGNoLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBjb2wsXG4gICAgICAgICAgICBsaW5lcztcbiAgICAgICAgaWYgKCF0aGlzLl9tb3JlKSB7XG4gICAgICAgICAgICB0aGlzLnl5dGV4dCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5tYXRjaCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBydWxlcyA9IHRoaXMuX2N1cnJlbnRSdWxlcygpO1xuICAgICAgICBmb3IgKHZhciBpPTA7aSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0ZW1wTWF0Y2ggPSB0aGlzLl9pbnB1dC5tYXRjaCh0aGlzLnJ1bGVzW3J1bGVzW2ldXSk7XG4gICAgICAgICAgICBpZiAodGVtcE1hdGNoICYmICghbWF0Y2ggfHwgdGVtcE1hdGNoWzBdLmxlbmd0aCA+IG1hdGNoWzBdLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRlbXBNYXRjaDtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZmxleCkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBsaW5lcyA9IG1hdGNoWzBdLm1hdGNoKC8oPzpcXHJcXG4/fFxcbikuKi9nKTtcbiAgICAgICAgICAgIGlmIChsaW5lcykgdGhpcy55eWxpbmVubyArPSBsaW5lcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnl5bGxvYyA9IHtmaXJzdF9saW5lOiB0aGlzLnl5bGxvYy5sYXN0X2xpbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X2xpbmU6IHRoaXMueXlsaW5lbm8rMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0X2NvbHVtbjogdGhpcy55eWxsb2MubGFzdF9jb2x1bW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X2NvbHVtbjogbGluZXMgPyBsaW5lc1tsaW5lcy5sZW5ndGgtMV0ubGVuZ3RoLWxpbmVzW2xpbmVzLmxlbmd0aC0xXS5tYXRjaCgvXFxyP1xcbj8vKVswXS5sZW5ndGggOiB0aGlzLnl5bGxvYy5sYXN0X2NvbHVtbiArIG1hdGNoWzBdLmxlbmd0aH07XG4gICAgICAgICAgICB0aGlzLnl5dGV4dCArPSBtYXRjaFswXTtcbiAgICAgICAgICAgIHRoaXMubWF0Y2ggKz0gbWF0Y2hbMF07XG4gICAgICAgICAgICB0aGlzLm1hdGNoZXMgPSBtYXRjaDtcbiAgICAgICAgICAgIHRoaXMueXlsZW5nID0gdGhpcy55eXRleHQubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnl5bGxvYy5yYW5nZSA9IFt0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKz0gdGhpcy55eWxlbmddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbW9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW5wdXQgPSB0aGlzLl9pbnB1dC5zbGljZShtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVkICs9IG1hdGNoWzBdO1xuICAgICAgICAgICAgdG9rZW4gPSB0aGlzLnBlcmZvcm1BY3Rpb24uY2FsbCh0aGlzLCB0aGlzLnl5LCB0aGlzLCBydWxlc1tpbmRleF0sdGhpcy5jb25kaXRpb25TdGFja1t0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aC0xXSk7XG4gICAgICAgICAgICBpZiAodGhpcy5kb25lICYmIHRoaXMuX2lucHV0KSB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0b2tlbikgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgZWxzZSByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lucHV0ID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5FT0Y7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUVycm9yKCdMZXhpY2FsIGVycm9yIG9uIGxpbmUgJysodGhpcy55eWxpbmVubysxKSsnLiBVbnJlY29nbml6ZWQgdGV4dC5cXG4nK3RoaXMuc2hvd1Bvc2l0aW9uKCksXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0OiBcIlwiLCB0b2tlbjogbnVsbCwgbGluZTogdGhpcy55eWxpbmVub30pO1xuICAgICAgICB9XG4gICAgfSxcbmxleDpmdW5jdGlvbiBsZXgoKSB7XG4gICAgICAgIHZhciByID0gdGhpcy5uZXh0KCk7XG4gICAgICAgIGlmICh0eXBlb2YgciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGV4KCk7XG4gICAgICAgIH1cbiAgICB9LFxuYmVnaW46ZnVuY3Rpb24gYmVnaW4oY29uZGl0aW9uKSB7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uU3RhY2sucHVzaChjb25kaXRpb24pO1xuICAgIH0sXG5wb3BTdGF0ZTpmdW5jdGlvbiBwb3BTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uU3RhY2sucG9wKCk7XG4gICAgfSxcbl9jdXJyZW50UnVsZXM6ZnVuY3Rpb24gX2N1cnJlbnRSdWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uc1t0aGlzLmNvbmRpdGlvblN0YWNrW3RoaXMuY29uZGl0aW9uU3RhY2subGVuZ3RoLTFdXS5ydWxlcztcbiAgICB9LFxudG9wU3RhdGU6ZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25kaXRpb25TdGFja1t0aGlzLmNvbmRpdGlvblN0YWNrLmxlbmd0aC0yXTtcbiAgICB9LFxucHVzaFN0YXRlOmZ1bmN0aW9uIGJlZ2luKGNvbmRpdGlvbikge1xuICAgICAgICB0aGlzLmJlZ2luKGNvbmRpdGlvbik7XG4gICAgfX0pO1xubGV4ZXIub3B0aW9ucyA9IHt9O1xubGV4ZXIucGVyZm9ybUFjdGlvbiA9IGZ1bmN0aW9uIGFub255bW91cyh5eSx5eV8sJGF2b2lkaW5nX25hbWVfY29sbGlzaW9ucyxZWV9TVEFSVCkge1xuXG5cbmZ1bmN0aW9uIHN0cmlwKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIHl5Xy55eXRleHQgPSB5eV8ueXl0ZXh0LnN1YnN0cihzdGFydCwgeXlfLnl5bGVuZy1lbmQpO1xufVxuXG5cbnZhciBZWVNUQVRFPVlZX1NUQVJUXG5zd2l0Y2goJGF2b2lkaW5nX25hbWVfY29sbGlzaW9ucykge1xuY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih5eV8ueXl0ZXh0LnNsaWNlKC0yKSA9PT0gXCJcXFxcXFxcXFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaXAoMCwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZ2luKFwibXVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih5eV8ueXl0ZXh0LnNsaWNlKC0xKSA9PT0gXCJcXFxcXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpcCgwLDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW4oXCJlbXVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWdpbihcIm11XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHl5Xy55eXRleHQpIHJldHVybiAxNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuYnJlYWs7XG5jYXNlIDE6cmV0dXJuIDE0O1xuYnJlYWs7XG5jYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wU3RhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5icmVhaztcbmNhc2UgMzpzdHJpcCgwLDQpOyB0aGlzLnBvcFN0YXRlKCk7IHJldHVybiAxNTtcbmJyZWFrO1xuY2FzZSA0OnJldHVybiAzNTtcbmJyZWFrO1xuY2FzZSA1OnJldHVybiAzNjtcbmJyZWFrO1xuY2FzZSA2OnJldHVybiAyNTtcbmJyZWFrO1xuY2FzZSA3OnJldHVybiAxNjtcbmJyZWFrO1xuY2FzZSA4OnJldHVybiAyMDtcbmJyZWFrO1xuY2FzZSA5OnJldHVybiAxOTtcbmJyZWFrO1xuY2FzZSAxMDpyZXR1cm4gMTk7XG5icmVhaztcbmNhc2UgMTE6cmV0dXJuIDIzO1xuYnJlYWs7XG5jYXNlIDEyOnJldHVybiAyMjtcbmJyZWFrO1xuY2FzZSAxMzp0aGlzLnBvcFN0YXRlKCk7IHRoaXMuYmVnaW4oJ2NvbScpO1xuYnJlYWs7XG5jYXNlIDE0OnN0cmlwKDMsNSk7IHRoaXMucG9wU3RhdGUoKTsgcmV0dXJuIDE1O1xuYnJlYWs7XG5jYXNlIDE1OnJldHVybiAyMjtcbmJyZWFrO1xuY2FzZSAxNjpyZXR1cm4gNDE7XG5icmVhaztcbmNhc2UgMTc6cmV0dXJuIDQwO1xuYnJlYWs7XG5jYXNlIDE4OnJldHVybiA0MDtcbmJyZWFrO1xuY2FzZSAxOTpyZXR1cm4gNDQ7XG5icmVhaztcbmNhc2UgMjA6Ly8gaWdub3JlIHdoaXRlc3BhY2VcbmJyZWFrO1xuY2FzZSAyMTp0aGlzLnBvcFN0YXRlKCk7IHJldHVybiAyNDtcbmJyZWFrO1xuY2FzZSAyMjp0aGlzLnBvcFN0YXRlKCk7IHJldHVybiAxODtcbmJyZWFrO1xuY2FzZSAyMzp5eV8ueXl0ZXh0ID0gc3RyaXAoMSwyKS5yZXBsYWNlKC9cXFxcXCIvZywnXCInKTsgcmV0dXJuIDMyO1xuYnJlYWs7XG5jYXNlIDI0Onl5Xy55eXRleHQgPSBzdHJpcCgxLDIpLnJlcGxhY2UoL1xcXFwnL2csXCInXCIpOyByZXR1cm4gMzI7XG5icmVhaztcbmNhc2UgMjU6cmV0dXJuIDQyO1xuYnJlYWs7XG5jYXNlIDI2OnJldHVybiAzNDtcbmJyZWFrO1xuY2FzZSAyNzpyZXR1cm4gMzQ7XG5icmVhaztcbmNhc2UgMjg6cmV0dXJuIDMzO1xuYnJlYWs7XG5jYXNlIDI5OnJldHVybiA0MDtcbmJyZWFrO1xuY2FzZSAzMDp5eV8ueXl0ZXh0ID0gc3RyaXAoMSwyKTsgcmV0dXJuIDQwO1xuYnJlYWs7XG5jYXNlIDMxOnJldHVybiAnSU5WQUxJRCc7XG5icmVhaztcbmNhc2UgMzI6cmV0dXJuIDU7XG5icmVhaztcbn1cbn07XG5sZXhlci5ydWxlcyA9IFsvXig/OlteXFx4MDBdKj8oPz0oXFx7XFx7KSkpLywvXig/OlteXFx4MDBdKykvLC9eKD86W15cXHgwMF17Mix9Pyg/PShcXHtcXHt8XFxcXFxce1xce3xcXFxcXFxcXFxce1xce3wkKSkpLywvXig/OltcXHNcXFNdKj8tLVxcfVxcfSkvLC9eKD86XFwoKS8sL14oPzpcXCkpLywvXig/Olxce1xceyh+KT8+KS8sL14oPzpcXHtcXHsofik/IykvLC9eKD86XFx7XFx7KH4pP1xcLykvLC9eKD86XFx7XFx7KH4pP1xcXikvLC9eKD86XFx7XFx7KH4pP1xccyplbHNlXFxiKS8sL14oPzpcXHtcXHsofik/XFx7KS8sL14oPzpcXHtcXHsofik/JikvLC9eKD86XFx7XFx7IS0tKS8sL14oPzpcXHtcXHshW1xcc1xcU10qP1xcfVxcfSkvLC9eKD86XFx7XFx7KH4pPykvLC9eKD86PSkvLC9eKD86XFwuXFwuKS8sL14oPzpcXC4oPz0oWz1+fVxcc1xcLy4pXSkpKS8sL14oPzpbXFwvLl0pLywvXig/OlxccyspLywvXig/OlxcfSh+KT9cXH1cXH0pLywvXig/Oih+KT9cXH1cXH0pLywvXig/OlwiKFxcXFxbXCJdfFteXCJdKSpcIikvLC9eKD86JyhcXFxcWyddfFteJ10pKicpLywvXig/OkApLywvXig/OnRydWUoPz0oW359XFxzKV0pKSkvLC9eKD86ZmFsc2UoPz0oW359XFxzKV0pKSkvLC9eKD86LT9bMC05XSsoPz0oW359XFxzKV0pKSkvLC9eKD86KFteXFxzIVwiIyUtLFxcLlxcLzstPkBcXFstXFxeYFxcey1+XSsoPz0oWz1+fVxcc1xcLy4pXSkpKSkvLC9eKD86XFxbW15cXF1dKlxcXSkvLC9eKD86LikvLC9eKD86JCkvXTtcbmxleGVyLmNvbmRpdGlvbnMgPSB7XCJtdVwiOntcInJ1bGVzXCI6WzQsNSw2LDcsOCw5LDEwLDExLDEyLDEzLDE0LDE1LDE2LDE3LDE4LDE5LDIwLDIxLDIyLDIzLDI0LDI1LDI2LDI3LDI4LDI5LDMwLDMxLDMyXSxcImluY2x1c2l2ZVwiOmZhbHNlfSxcImVtdVwiOntcInJ1bGVzXCI6WzJdLFwiaW5jbHVzaXZlXCI6ZmFsc2V9LFwiY29tXCI6e1wicnVsZXNcIjpbM10sXCJpbmNsdXNpdmVcIjpmYWxzZX0sXCJJTklUSUFMXCI6e1wicnVsZXNcIjpbMCwxLDMyXSxcImluY2x1c2l2ZVwiOnRydWV9fTtcbnJldHVybiBsZXhlcjt9KSgpXG5wYXJzZXIubGV4ZXIgPSBsZXhlcjtcbmZ1bmN0aW9uIFBhcnNlciAoKSB7IHRoaXMueXkgPSB7fTsgfVBhcnNlci5wcm90b3R5cGUgPSBwYXJzZXI7cGFyc2VyLlBhcnNlciA9IFBhcnNlcjtcbnJldHVybiBuZXcgUGFyc2VyO1xufSkoKTtleHBvcnRzW1wiZGVmYXVsdFwiXSA9IGhhbmRsZWJhcnM7XG4vKiBqc2hpbnQgaWdub3JlOmVuZCAqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIFZpc2l0b3IgPSByZXF1aXJlKFwiLi92aXNpdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxuZnVuY3Rpb24gcHJpbnQoYXN0KSB7XG4gIHJldHVybiBuZXcgUHJpbnRWaXNpdG9yKCkuYWNjZXB0KGFzdCk7XG59XG5cbmV4cG9ydHMucHJpbnQgPSBwcmludDtmdW5jdGlvbiBQcmludFZpc2l0b3IoKSB7XG4gIHRoaXMucGFkZGluZyA9IDA7XG59XG5cbmV4cG9ydHMuUHJpbnRWaXNpdG9yID0gUHJpbnRWaXNpdG9yO1ByaW50VmlzaXRvci5wcm90b3R5cGUgPSBuZXcgVmlzaXRvcigpO1xuXG5QcmludFZpc2l0b3IucHJvdG90eXBlLnBhZCA9IGZ1bmN0aW9uKHN0cmluZywgbmV3bGluZSkge1xuICB2YXIgb3V0ID0gXCJcIjtcblxuICBmb3IodmFyIGk9MCxsPXRoaXMucGFkZGluZzsgaTxsOyBpKyspIHtcbiAgICBvdXQgPSBvdXQgKyBcIiAgXCI7XG4gIH1cblxuICBvdXQgPSBvdXQgKyBzdHJpbmc7XG5cbiAgaWYobmV3bGluZSAhPT0gZmFsc2UpIHsgb3V0ID0gb3V0ICsgXCJcXG5cIjsgfVxuICByZXR1cm4gb3V0O1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5wcm9ncmFtID0gZnVuY3Rpb24ocHJvZ3JhbSkge1xuICB2YXIgb3V0ID0gXCJcIixcbiAgICAgIHN0YXRlbWVudHMgPSBwcm9ncmFtLnN0YXRlbWVudHMsXG4gICAgICBpLCBsO1xuXG4gIGZvcihpPTAsIGw9c3RhdGVtZW50cy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgb3V0ID0gb3V0ICsgdGhpcy5hY2NlcHQoc3RhdGVtZW50c1tpXSk7XG4gIH1cblxuICB0aGlzLnBhZGRpbmctLTtcblxuICByZXR1cm4gb3V0O1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5ibG9jayA9IGZ1bmN0aW9uKGJsb2NrKSB7XG4gIHZhciBvdXQgPSBcIlwiO1xuXG4gIG91dCA9IG91dCArIHRoaXMucGFkKFwiQkxPQ0s6XCIpO1xuICB0aGlzLnBhZGRpbmcrKztcbiAgb3V0ID0gb3V0ICsgdGhpcy5hY2NlcHQoYmxvY2subXVzdGFjaGUpO1xuICBpZiAoYmxvY2sucHJvZ3JhbSkge1xuICAgIG91dCA9IG91dCArIHRoaXMucGFkKFwiUFJPR1JBTTpcIik7XG4gICAgdGhpcy5wYWRkaW5nKys7XG4gICAgb3V0ID0gb3V0ICsgdGhpcy5hY2NlcHQoYmxvY2sucHJvZ3JhbSk7XG4gICAgdGhpcy5wYWRkaW5nLS07XG4gIH1cbiAgaWYgKGJsb2NrLmludmVyc2UpIHtcbiAgICBpZiAoYmxvY2sucHJvZ3JhbSkgeyB0aGlzLnBhZGRpbmcrKzsgfVxuICAgIG91dCA9IG91dCArIHRoaXMucGFkKFwie3tefX1cIik7XG4gICAgdGhpcy5wYWRkaW5nKys7XG4gICAgb3V0ID0gb3V0ICsgdGhpcy5hY2NlcHQoYmxvY2suaW52ZXJzZSk7XG4gICAgdGhpcy5wYWRkaW5nLS07XG4gICAgaWYgKGJsb2NrLnByb2dyYW0pIHsgdGhpcy5wYWRkaW5nLS07IH1cbiAgfVxuICB0aGlzLnBhZGRpbmctLTtcblxuICByZXR1cm4gb3V0O1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5zZXhwciA9IGZ1bmN0aW9uKHNleHByKSB7XG4gIHZhciBwYXJhbXMgPSBzZXhwci5wYXJhbXMsIHBhcmFtU3RyaW5ncyA9IFtdLCBoYXNoO1xuXG4gIGZvcih2YXIgaT0wLCBsPXBhcmFtcy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgcGFyYW1TdHJpbmdzLnB1c2godGhpcy5hY2NlcHQocGFyYW1zW2ldKSk7XG4gIH1cblxuICBwYXJhbXMgPSBcIltcIiArIHBhcmFtU3RyaW5ncy5qb2luKFwiLCBcIikgKyBcIl1cIjtcblxuICBoYXNoID0gc2V4cHIuaGFzaCA/IFwiIFwiICsgdGhpcy5hY2NlcHQoc2V4cHIuaGFzaCkgOiBcIlwiO1xuXG4gIHJldHVybiB0aGlzLmFjY2VwdChzZXhwci5pZCkgKyBcIiBcIiArIHBhcmFtcyArIGhhc2g7XG59O1xuXG5QcmludFZpc2l0b3IucHJvdG90eXBlLm11c3RhY2hlID0gZnVuY3Rpb24obXVzdGFjaGUpIHtcbiAgcmV0dXJuIHRoaXMucGFkKFwie3sgXCIgKyB0aGlzLmFjY2VwdChtdXN0YWNoZS5zZXhwcikgKyBcIiB9fVwiKTtcbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUucGFydGlhbCA9IGZ1bmN0aW9uKHBhcnRpYWwpIHtcbiAgdmFyIGNvbnRlbnQgPSB0aGlzLmFjY2VwdChwYXJ0aWFsLnBhcnRpYWxOYW1lKTtcbiAgaWYocGFydGlhbC5jb250ZXh0KSB7IGNvbnRlbnQgPSBjb250ZW50ICsgXCIgXCIgKyB0aGlzLmFjY2VwdChwYXJ0aWFsLmNvbnRleHQpOyB9XG4gIHJldHVybiB0aGlzLnBhZChcInt7PiBcIiArIGNvbnRlbnQgKyBcIiB9fVwiKTtcbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUuaGFzaCA9IGZ1bmN0aW9uKGhhc2gpIHtcbiAgdmFyIHBhaXJzID0gaGFzaC5wYWlycztcbiAgdmFyIGpvaW5lZFBhaXJzID0gW10sIGxlZnQsIHJpZ2h0O1xuXG4gIGZvcih2YXIgaT0wLCBsPXBhaXJzLmxlbmd0aDsgaTxsOyBpKyspIHtcbiAgICBsZWZ0ID0gcGFpcnNbaV1bMF07XG4gICAgcmlnaHQgPSB0aGlzLmFjY2VwdChwYWlyc1tpXVsxXSk7XG4gICAgam9pbmVkUGFpcnMucHVzaCggbGVmdCArIFwiPVwiICsgcmlnaHQgKTtcbiAgfVxuXG4gIHJldHVybiBcIkhBU0h7XCIgKyBqb2luZWRQYWlycy5qb2luKFwiLCBcIikgKyBcIn1cIjtcbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUuU1RSSU5HID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiAnXCInICsgc3RyaW5nLnN0cmluZyArICdcIic7XG59O1xuXG5QcmludFZpc2l0b3IucHJvdG90eXBlLklOVEVHRVIgPSBmdW5jdGlvbihpbnRlZ2VyKSB7XG4gIHJldHVybiBcIklOVEVHRVJ7XCIgKyBpbnRlZ2VyLmludGVnZXIgKyBcIn1cIjtcbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUuQk9PTEVBTiA9IGZ1bmN0aW9uKGJvb2wpIHtcbiAgcmV0dXJuIFwiQk9PTEVBTntcIiArIGJvb2wuYm9vbCArIFwifVwiO1xufTtcblxuUHJpbnRWaXNpdG9yLnByb3RvdHlwZS5JRCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHZhciBwYXRoID0gaWQucGFydHMuam9pbihcIi9cIik7XG4gIGlmKGlkLnBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gXCJQQVRIOlwiICsgcGF0aDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJJRDpcIiArIHBhdGg7XG4gIH1cbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUuUEFSVElBTF9OQU1FID0gZnVuY3Rpb24ocGFydGlhbE5hbWUpIHtcbiAgICByZXR1cm4gXCJQQVJUSUFMOlwiICsgcGFydGlhbE5hbWUubmFtZTtcbn07XG5cblByaW50VmlzaXRvci5wcm90b3R5cGUuREFUQSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgcmV0dXJuIFwiQFwiICsgdGhpcy5hY2NlcHQoZGF0YS5pZCk7XG59O1xuXG5QcmludFZpc2l0b3IucHJvdG90eXBlLmNvbnRlbnQgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gIHJldHVybiB0aGlzLnBhZChcIkNPTlRFTlRbICdcIiArIGNvbnRlbnQuc3RyaW5nICsgXCInIF1cIik7XG59O1xuXG5QcmludFZpc2l0b3IucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbihjb21tZW50KSB7XG4gIHJldHVybiB0aGlzLnBhZChcInt7ISAnXCIgKyBjb21tZW50LmNvbW1lbnQgKyBcIicgfX1cIik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gVmlzaXRvcigpIHt9XG5cblZpc2l0b3IucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogVmlzaXRvcixcblxuICBhY2NlcHQ6IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0aGlzW29iamVjdC50eXBlXShvYmplY3QpO1xuICB9XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFZpc2l0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBlcnJvclByb3BzID0gWydkZXNjcmlwdGlvbicsICdmaWxlTmFtZScsICdsaW5lTnVtYmVyJywgJ21lc3NhZ2UnLCAnbmFtZScsICdudW1iZXInLCAnc3RhY2snXTtcblxuZnVuY3Rpb24gRXhjZXB0aW9uKG1lc3NhZ2UsIG5vZGUpIHtcbiAgdmFyIGxpbmU7XG4gIGlmIChub2RlICYmIG5vZGUuZmlyc3RMaW5lKSB7XG4gICAgbGluZSA9IG5vZGUuZmlyc3RMaW5lO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBub2RlLmZpcnN0Q29sdW1uO1xuICB9XG5cbiAgdmFyIHRtcCA9IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIC8vIFVuZm9ydHVuYXRlbHkgZXJyb3JzIGFyZSBub3QgZW51bWVyYWJsZSBpbiBDaHJvbWUgKGF0IGxlYXN0KSwgc28gYGZvciBwcm9wIGluIHRtcGAgZG9lc24ndCB3b3JrLlxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBlcnJvclByb3BzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzW2Vycm9yUHJvcHNbaWR4XV0gPSB0bXBbZXJyb3JQcm9wc1tpZHhdXTtcbiAgfVxuXG4gIGlmIChsaW5lKSB7XG4gICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcbiAgICB0aGlzLmNvbHVtbiA9IG5vZGUuZmlyc3RDb2x1bW47XG4gIH1cbn1cblxuRXhjZXB0aW9uLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IEV4Y2VwdGlvbjsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBVdGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xudmFyIEV4Y2VwdGlvbiA9IHJlcXVpcmUoXCIuL2V4Y2VwdGlvblwiKVtcImRlZmF1bHRcIl07XG52YXIgQ09NUElMRVJfUkVWSVNJT04gPSByZXF1aXJlKFwiLi9iYXNlXCIpLkNPTVBJTEVSX1JFVklTSU9OO1xudmFyIFJFVklTSU9OX0NIQU5HRVMgPSByZXF1aXJlKFwiLi9iYXNlXCIpLlJFVklTSU9OX0NIQU5HRVM7XG5cbmZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIHZhciBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgY3VycmVudFJldmlzaW9uID0gQ09NUElMRVJfUkVWSVNJT047XG5cbiAgaWYgKGNvbXBpbGVyUmV2aXNpb24gIT09IGN1cnJlbnRSZXZpc2lvbikge1xuICAgIGlmIChjb21waWxlclJldmlzaW9uIDwgY3VycmVudFJldmlzaW9uKSB7XG4gICAgICB2YXIgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIlRlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGFuIG9sZGVyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuIFwiK1xuICAgICAgICAgICAgXCJQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uIChcIitydW50aW1lVmVyc2lvbnMrXCIpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoXCIrY29tcGlsZXJWZXJzaW9ucytcIikuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuIFwiK1xuICAgICAgICAgICAgXCJQbGVhc2UgdXBkYXRlIHlvdXIgcnVudGltZSB0byBhIG5ld2VyIHZlcnNpb24gKFwiK2NvbXBpbGVySW5mb1sxXStcIikuXCIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzLmNoZWNrUmV2aXNpb24gPSBjaGVja1JldmlzaW9uOy8vIFRPRE86IFJlbW92ZSB0aGlzIGxpbmUgYW5kIGJyZWFrIHVwIGNvbXBpbGVQYXJ0aWFsXG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHRlbXBsYXRlU3BlYywgZW52KSB7XG4gIGlmICghZW52KSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk5vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZVwiKTtcbiAgfVxuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIHZhciBpbnZva2VQYXJ0aWFsV3JhcHBlciA9IGZ1bmN0aW9uKHBhcnRpYWwsIG5hbWUsIGNvbnRleHQsIGhlbHBlcnMsIHBhcnRpYWxzLCBkYXRhKSB7XG4gICAgdmFyIHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7IHJldHVybiByZXN1bHQ7IH1cblxuICAgIGlmIChlbnYuY29tcGlsZSkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7IGhlbHBlcnM6IGhlbHBlcnMsIHBhcnRpYWxzOiBwYXJ0aWFscywgZGF0YTogZGF0YSB9O1xuICAgICAgcGFydGlhbHNbbmFtZV0gPSBlbnYuY29tcGlsZShwYXJ0aWFsLCB7IGRhdGE6IGRhdGEgIT09IHVuZGVmaW5lZCB9LCBlbnYpO1xuICAgICAgcmV0dXJuIHBhcnRpYWxzW25hbWVdKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwiVGhlIHBhcnRpYWwgXCIgKyBuYW1lICsgXCIgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZVwiKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgdmFyIGNvbnRhaW5lciA9IHtcbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBmbiwgZGF0YSkge1xuICAgICAgdmFyIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXTtcbiAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSBwcm9ncmFtKGksIGZuLCBkYXRhKTtcbiAgICAgIH0gZWxzZSBpZiAoIXByb2dyYW1XcmFwcGVyKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gdGhpcy5wcm9ncmFtc1tpXSA9IHByb2dyYW0oaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIHZhciByZXQgPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIHJldCA9IHt9O1xuICAgICAgICBVdGlscy5leHRlbmQocmV0LCBjb21tb24pO1xuICAgICAgICBVdGlscy5leHRlbmQocmV0LCBwYXJhbSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG4gICAgcHJvZ3JhbVdpdGhEZXB0aDogZW52LlZNLnByb2dyYW1XaXRoRGVwdGgsXG4gICAgbm9vcDogZW52LlZNLm5vb3AsXG4gICAgY29tcGlsZXJJbmZvOiBudWxsXG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgbmFtZXNwYWNlID0gb3B0aW9ucy5wYXJ0aWFsID8gb3B0aW9ucyA6IGVudixcbiAgICAgICAgaGVscGVycyxcbiAgICAgICAgcGFydGlhbHM7XG5cbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIHBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IHRlbXBsYXRlU3BlYy5jYWxsKFxuICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICBuYW1lc3BhY2UsIGNvbnRleHQsXG4gICAgICAgICAgaGVscGVycyxcbiAgICAgICAgICBwYXJ0aWFscyxcbiAgICAgICAgICBvcHRpb25zLmRhdGEpO1xuXG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGVudi5WTS5jaGVja1JldmlzaW9uKGNvbnRhaW5lci5jb21waWxlckluZm8pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbmV4cG9ydHMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtmdW5jdGlvbiBwcm9ncmFtV2l0aERlcHRoKGksIGZuLCBkYXRhIC8qLCAkZGVwdGggKi8pIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpO1xuXG4gIHZhciBwcm9nID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIFtjb250ZXh0LCBvcHRpb25zLmRhdGEgfHwgZGF0YV0uY29uY2F0KGFyZ3MpKTtcbiAgfTtcbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGFyZ3MubGVuZ3RoO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0cy5wcm9ncmFtV2l0aERlcHRoID0gcHJvZ3JhbVdpdGhEZXB0aDtmdW5jdGlvbiBwcm9ncmFtKGksIGZuLCBkYXRhKSB7XG4gIHZhciBwcm9nID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMuZGF0YSB8fCBkYXRhKTtcbiAgfTtcbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IDA7XG4gIHJldHVybiBwcm9nO1xufVxuXG5leHBvcnRzLnByb2dyYW0gPSBwcm9ncmFtO2Z1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgbmFtZSwgY29udGV4dCwgaGVscGVycywgcGFydGlhbHMsIGRhdGEpIHtcbiAgdmFyIG9wdGlvbnMgPSB7IHBhcnRpYWw6IHRydWUsIGhlbHBlcnM6IGhlbHBlcnMsIHBhcnRpYWxzOiBwYXJ0aWFscywgZGF0YTogZGF0YSB9O1xuXG4gIGlmKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUaGUgcGFydGlhbCBcIiArIG5hbWUgKyBcIiBjb3VsZCBub3QgYmUgZm91bmRcIik7XG4gIH0gZWxzZSBpZihwYXJ0aWFsIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICByZXR1cm4gcGFydGlhbChjb250ZXh0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnRzLmludm9rZVBhcnRpYWwgPSBpbnZva2VQYXJ0aWFsO2Z1bmN0aW9uIG5vb3AoKSB7IHJldHVybiBcIlwiOyB9XG5cbmV4cG9ydHMubm9vcCA9IG5vb3A7IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBcIlwiICsgdGhpcy5zdHJpbmc7XG59O1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IFNhZmVTdHJpbmc7IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKmpzaGludCAtVzAwNCAqL1xudmFyIFNhZmVTdHJpbmcgPSByZXF1aXJlKFwiLi9zYWZlLXN0cmluZ1wiKVtcImRlZmF1bHRcIl07XG5cbnZhciBlc2NhcGUgPSB7XG4gIFwiJlwiOiBcIiZhbXA7XCIsXG4gIFwiPFwiOiBcIiZsdDtcIixcbiAgXCI+XCI6IFwiJmd0O1wiLFxuICAnXCInOiBcIiZxdW90O1wiLFxuICBcIidcIjogXCImI3gyNztcIixcbiAgXCJgXCI6IFwiJiN4NjA7XCJcbn07XG5cbnZhciBiYWRDaGFycyA9IC9bJjw+XCInYF0vZztcbnZhciBwb3NzaWJsZSA9IC9bJjw+XCInYF0vO1xuXG5mdW5jdGlvbiBlc2NhcGVDaGFyKGNocikge1xuICByZXR1cm4gZXNjYXBlW2Nocl0gfHwgXCImYW1wO1wiO1xufVxuXG5mdW5jdGlvbiBleHRlbmQob2JqLCB2YWx1ZSkge1xuICBmb3IodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkge1xuICAgICAgb2JqW2tleV0gPSB2YWx1ZVtrZXldO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzLmV4dGVuZCA9IGV4dGVuZDt2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICBpc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nICYmIHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICB9O1xufVxudmFyIGlzRnVuY3Rpb247XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IGZhbHNlO1xufTtcbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGVzY2FwZUV4cHJlc3Npb24oc3RyaW5nKSB7XG4gIC8vIGRvbid0IGVzY2FwZSBTYWZlU3RyaW5ncywgc2luY2UgdGhleSdyZSBhbHJlYWR5IHNhZmVcbiAgaWYgKHN0cmluZyBpbnN0YW5jZW9mIFNhZmVTdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSBpZiAoIXN0cmluZyAmJiBzdHJpbmcgIT09IDApIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8vIEZvcmNlIGEgc3RyaW5nIGNvbnZlcnNpb24gYXMgdGhpcyB3aWxsIGJlIGRvbmUgYnkgdGhlIGFwcGVuZCByZWdhcmRsZXNzIGFuZFxuICAvLyB0aGUgcmVnZXggdGVzdCB3aWxsIGRvIHRoaXMgdHJhbnNwYXJlbnRseSBiZWhpbmQgdGhlIHNjZW5lcywgY2F1c2luZyBpc3N1ZXMgaWZcbiAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gIHN0cmluZyA9IFwiXCIgKyBzdHJpbmc7XG5cbiAgaWYoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydHMuZXNjYXBlRXhwcmVzc2lvbiA9IGVzY2FwZUV4cHJlc3Npb247ZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydHMuaXNFbXB0eSA9IGlzRW1wdHk7IiwiLy8gVVNBR0U6XG4vLyB2YXIgaGFuZGxlYmFycyA9IHJlcXVpcmUoJ2hhbmRsZWJhcnMnKTtcblxuLy8gdmFyIGxvY2FsID0gaGFuZGxlYmFycy5jcmVhdGUoKTtcblxudmFyIGhhbmRsZWJhcnMgPSByZXF1aXJlKCcuLi9kaXN0L2Nqcy9oYW5kbGViYXJzJylbXCJkZWZhdWx0XCJdO1xuXG5oYW5kbGViYXJzLlZpc2l0b3IgPSByZXF1aXJlKCcuLi9kaXN0L2Nqcy9oYW5kbGViYXJzL2NvbXBpbGVyL3Zpc2l0b3InKVtcImRlZmF1bHRcIl07XG5cbnZhciBwcmludGVyID0gcmVxdWlyZSgnLi4vZGlzdC9janMvaGFuZGxlYmFycy9jb21waWxlci9wcmludGVyJyk7XG5oYW5kbGViYXJzLlByaW50VmlzaXRvciA9IHByaW50ZXIuUHJpbnRWaXNpdG9yO1xuaGFuZGxlYmFycy5wcmludCA9IHByaW50ZXIucHJpbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gaGFuZGxlYmFycztcblxuLy8gUHVibGlzaCBhIE5vZGUuanMgcmVxdWlyZSgpIGhhbmRsZXIgZm9yIC5oYW5kbGViYXJzIGFuZCAuaGJzIGZpbGVzXG5pZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnICYmIHJlcXVpcmUuZXh0ZW5zaW9ucykge1xuICB2YXIgZXh0ZW5zaW9uID0gZnVuY3Rpb24obW9kdWxlLCBmaWxlbmFtZSkge1xuICAgIHZhciBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbiAgICB2YXIgdGVtcGxhdGVTdHJpbmcgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsIFwidXRmOFwiKTtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGhhbmRsZWJhcnMuY29tcGlsZSh0ZW1wbGF0ZVN0cmluZyk7XG4gIH07XG4gIHJlcXVpcmUuZXh0ZW5zaW9uc1tcIi5oYW5kbGViYXJzXCJdID0gZXh0ZW5zaW9uO1xuICByZXF1aXJlLmV4dGVuc2lvbnNbXCIuaGJzXCJdID0gZXh0ZW5zaW9uO1xufVxuIixudWxsXX0=
