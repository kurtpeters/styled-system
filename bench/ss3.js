'use strict'
// copied from styled-system/dist

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.mixed = exports.styles = exports.buttonStyle = exports.colorStyle = exports.textStyle = exports.left = exports.bottom = exports.right = exports.top = exports.zIndex = exports.position = exports.backgroundRepeat = exports.backgroundPosition = exports.backgroundSize = exports.backgroundImage = exports.background = exports.overflow = exports.opacity = exports.boxShadow = exports.borderRadius = exports.borderColor = exports.borders = exports.borderLeft = exports.borderBottom = exports.borderRight = exports.borderTop = exports.border = exports.gridArea = exports.gridTemplateAreas = exports.gridTemplateRows = exports.gridTemplateColumns = exports.gridAutoRows = exports.gridAutoColumns = exports.gridAutoFlow = exports.gridRow = exports.gridColumn = exports.gridRowGap = exports.gridColumnGap = exports.gridGap = exports.order = exports.alignSelf = exports.justifySelf = exports.flex = exports.flexDirection = exports.flexBasis = exports.flexWrap = exports.justifyContent = exports.justifyItems = exports.alignContent = exports.alignItems = exports.verticalAlign = exports.ratio = exports.ratioPadding = exports.size = exports.sizeHeight = exports.sizeWidth = exports.minHeight = exports.maxHeight = exports.height = exports.minWidth = exports.maxWidth = exports.display = exports.letterSpacing = exports.fontStyle = exports.fontWeight = exports.lineHeight = exports.textAlign = exports.fontFamily = exports.color = exports.bgColor = exports.textColor = exports.fontSize = exports.width = exports.space = exports.util = exports.variant = exports.getWidth = exports.style = exports.createMediaQuery = exports.compose = exports.merge = exports.cloneFunc = exports.themeGet = exports.get = exports.isObject = exports.isArray = exports.px = exports.num = exports.is = exports.defaultBreakpoints = exports.propTypes = void 0

var _extends3 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

// utils
var noop = function noop(n) {
  return n
}

var propTypes = {
  numberOrString: _propTypes.default.oneOfType([
    _propTypes.default.number,
    _propTypes.default.string,
  ]),
  responsive: _propTypes.default.oneOfType([
    _propTypes.default.number,
    _propTypes.default.string,
    _propTypes.default.array,
    _propTypes.default.object,
  ]),
}
exports.propTypes = propTypes
var defaultBreakpoints = [40, 52, 64].map(function(n) {
  return n + 'em'
})
exports.defaultBreakpoints = defaultBreakpoints

var is = function is(n) {
  return n !== undefined && n !== null
}

exports.is = is

var num = function num(n) {
  return typeof n === 'number' && !isNaN(n)
}

exports.num = num

var px = function px(n) {
  return num(n) ? n + 'px' : n
}

exports.px = px
var isArray = Array.isArray
exports.isArray = isArray

var isObject = function isObject(n) {
  return typeof n === 'object' && n !== null
}

exports.isObject = isObject

var get = function get(obj) {
  for (
    var _len = arguments.length,
      paths = new Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    paths[_key - 1] = arguments[_key]
  }

  return paths
    .join('.')
    .split('.')
    .reduce(function(a, b) {
      return a && a[b] ? a[b] : null
    }, obj)
}

exports.get = get

var themeGet = function themeGet(paths, fallback) {
  return function(props) {
    return get(props.theme, paths) || fallback
  }
}

exports.themeGet = themeGet

var cloneFunc = function cloneFunc(fn) {
  return function() {
    return fn.apply(void 0, arguments)
  }
}

exports.cloneFunc = cloneFunc

var merge = function merge(a, b) {
  return Object.assign(
    {},
    a,
    b,
    Object.keys(b || {}).reduce(function(obj, key) {
      var _Object$assign

      return Object.assign(
        obj,
        ((_Object$assign = {}),
        (_Object$assign[key] =
          a[key] !== null && typeof a[key] === 'object'
            ? merge(a[key], b[key])
            : b[key]),
        _Object$assign)
      )
    }, {})
  )
}

exports.merge = merge

var compose = function compose() {
  for (
    var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    funcs[_key2] = arguments[_key2]
  }

  var fn = function fn(props) {
    return funcs
      .map(function(fn) {
        return fn(props)
      })
      .filter(Boolean)
      .reduce(merge, {})
  }

  fn.propTypes = funcs
    .map(function(fn) {
      return fn.propTypes
    })
    .reduce(merge, {})
  return fn
}

exports.compose = compose

var createMediaQuery = function createMediaQuery(n) {
  return '@media screen and (min-width: ' + px(n) + ')'
}

exports.createMediaQuery = createMediaQuery

var getStyles = function getStyles(_ref) {
  var props = _ref.props,
    style = _ref.style,
    value = _ref.value

  if (!isObject(value)) {
    return style(value)
  } // how to hoist this up??

  var breakpoints = get(props.theme, 'breakpoints') || defaultBreakpoints

  if (isArray(value)) {
    var _styles = style(value[0]) || {}

    for (var i = 1; i < value.length; i++) {
      var rule = style(value[i])

      if (rule) {
        var media = createMediaQuery(breakpoints[i - 1])
        _styles[media] = rule
      }
    }

    return _styles
  }

  var styles = {}

  for (var breakpoint in value) {
    var _minWidth = breakpoints[breakpoint]

    if (!_minWidth) {
      Object.assign(styles, style(value[breakpoint]))
    } else {
      var _rule = style(value[breakpoint])

      var _media = createMediaQuery(_minWidth)

      styles[_media] = _rule
    }
  }

  return styles
}

var style = function style(_ref2) {
  var _fn$propTypes

  var prop = _ref2.prop,
    cssProperty = _ref2.cssProperty,
    key = _ref2.key,
    getter = _ref2.getter,
    transformValue = _ref2.transformValue,
    _ref2$scale = _ref2.scale,
    defaultScale = _ref2$scale === void 0 ? {} : _ref2$scale
  var css = cssProperty || prop
  var transform = transformValue || getter || noop

  var fn = function fn(props) {
    var value = props[prop]
    if (!is(value)) return null
    var scale = get(props.theme, key) || defaultScale

    var style = function style(n) {
      var _ref3

      return is(n)
        ? ((_ref3 = {}), (_ref3[css] = transform(get(scale, n) || n)), _ref3)
        : null
    }

    return getStyles({
      props: props,
      style: style,
      value: value,
    })
  }

  fn.propTypes = ((_fn$propTypes = {}),
  (_fn$propTypes[prop] = cloneFunc(propTypes.responsive)),
  _fn$propTypes)
  fn.propTypes[prop].meta = {
    prop: prop,
    themeKey: key,
    styleType: 'responsive',
  }
  return fn
}

exports.style = style

var getWidth = function getWidth(n) {
  return !num(n) || n > 1 ? px(n) : n * 100 + '%'
} // variant

exports.getWidth = getWidth

var variant = function variant(_ref4) {
  var _fn$propTypes2

  var key = _ref4.key,
    _ref4$prop = _ref4.prop,
    prop = _ref4$prop === void 0 ? 'variant' : _ref4$prop

  var fn = function fn(props) {
    return get(props.theme, key, props[prop]) || null
  }

  fn.propTypes = ((_fn$propTypes2 = {}),
  (_fn$propTypes2[prop] = propTypes.numberOrString),
  _fn$propTypes2)
  return fn
}

exports.variant = variant
var util = {
  propTypes: propTypes,
  defaultBreakpoints: defaultBreakpoints,
  is: is,
  num: num,
  px: px,
  get: get,
  themeGet: themeGet,
  cloneFunc: cloneFunc,
  merge: merge,
  compose: compose,
  createMediaQuery: createMediaQuery,
  style: style, // space
}
exports.util = util

var isNegative = function isNegative(n) {
  return n < 0
}

var REG = /^[mp][trblxy]?$/
var properties = {
  m: 'margin',
  p: 'padding',
}
var directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
}

var getProperties = function getProperties(key) {
  var _key$split = key.split(''),
    a = _key$split[0],
    b = _key$split[1]

  var property = properties[a]
  var direction = directions[b] || ''
  return Array.isArray(direction)
    ? direction.map(function(dir) {
        return property + dir
      })
    : [property + direction]
}

var getValue = function getValue(scale) {
  return function(n) {
    if (!num(n)) {
      return px(get(scale, n) || n)
    }

    var abs = Math.abs(n)
    var neg = isNegative(n)
    var value = scale[abs] || abs

    if (!num(value)) {
      return neg ? '-' + value : value
    }

    return px(value * (neg ? -1 : 1))
  }
}

var defaultScale = [0, 4, 8, 16, 32, 64, 128, 256, 512]

var space = function space(props) {
  var keys = Object.keys(props)
    .filter(function(key) {
      return REG.test(key)
    })
    .sort()
  var scale = get(props.theme, 'space') || defaultScale
  var getStyle = getValue(scale)
  return keys
    .map(function(key) {
      var value = props[key]
      var properties = getProperties(key)

      var style = function style(n) {
        return is(n)
          ? properties.reduce(function(a, prop) {
              var _extends2

              return (0,
              _extends3.default)({}, a, ((_extends2 = {}), (_extends2[prop] = getStyle(n)), _extends2))
            }, {})
          : null
      }

      return getStyles({
        props: props,
        style: style,
        value: value,
      })
    })
    .reduce(merge, {})
}

exports.space = space
space.propTypes = {
  m: cloneFunc(propTypes.responsive),
  mt: cloneFunc(propTypes.responsive),
  mr: cloneFunc(propTypes.responsive),
  mb: cloneFunc(propTypes.responsive),
  ml: cloneFunc(propTypes.responsive),
  mx: cloneFunc(propTypes.responsive),
  my: cloneFunc(propTypes.responsive),
  p: cloneFunc(propTypes.responsive),
  pt: cloneFunc(propTypes.responsive),
  pr: cloneFunc(propTypes.responsive),
  pb: cloneFunc(propTypes.responsive),
  pl: cloneFunc(propTypes.responsive),
  px: cloneFunc(propTypes.responsive),
  py: cloneFunc(propTypes.responsive),
}

var meta = function meta(prop) {
  return {
    prop: prop,
    themeKey: 'space',
    styleType: 'responsive',
  }
}

Object.keys(space.propTypes).forEach(function(prop) {
  space.propTypes[prop].meta = meta(prop)
}) // styles

var width = style({
  prop: 'width',
  transformValue: getWidth,
})
exports.width = width
var fontSize = style({
  prop: 'fontSize',
  key: 'fontSizes',
  transformValue: px,
  scale: [12, 14, 16, 20, 24, 32, 48, 64, 72],
})
exports.fontSize = fontSize
var textColor = style({
  prop: 'color',
  key: 'colors',
})
exports.textColor = textColor
var bgColor = style({
  prop: 'bg',
  cssProperty: 'backgroundColor',
  key: 'colors',
})
exports.bgColor = bgColor
var color = compose(
  textColor,
  bgColor
) // typography

exports.color = color
var fontFamily = style({
  prop: 'fontFamily',
  key: 'fonts',
})
exports.fontFamily = fontFamily
var textAlign = style({
  prop: 'textAlign',
})
exports.textAlign = textAlign
var lineHeight = style({
  prop: 'lineHeight',
  key: 'lineHeights',
})
exports.lineHeight = lineHeight
var fontWeight = style({
  prop: 'fontWeight',
  key: 'fontWeights',
})
exports.fontWeight = fontWeight
var fontStyle = style({
  prop: 'fontStyle',
})
exports.fontStyle = fontStyle
var letterSpacing = style({
  prop: 'letterSpacing',
  key: 'letterSpacings',
  transformValue: px,
}) // layout

exports.letterSpacing = letterSpacing
var display = style({
  prop: 'display',
})
exports.display = display
var maxWidth = style({
  prop: 'maxWidth',
  key: 'maxWidths',
  transformValue: px,
})
exports.maxWidth = maxWidth
var minWidth = style({
  prop: 'minWidth',
  key: 'minWidths',
  transformValue: px,
})
exports.minWidth = minWidth
var height = style({
  prop: 'height',
  key: 'heights',
  transformValue: px,
})
exports.height = height
var maxHeight = style({
  prop: 'maxHeight',
  key: 'maxHeights',
  transformValue: px,
})
exports.maxHeight = maxHeight
var minHeight = style({
  prop: 'minHeight',
  key: 'minHeights',
  transformValue: px,
})
exports.minHeight = minHeight
var sizeWidth = style({
  prop: 'size',
  cssProperty: 'width',
  transformValue: px,
})
exports.sizeWidth = sizeWidth
var sizeHeight = style({
  prop: 'size',
  cssProperty: 'height',
  transformValue: px,
})
exports.sizeHeight = sizeHeight
var size = compose(
  sizeHeight,
  sizeWidth
)
exports.size = size
var ratioPadding = style({
  prop: 'ratio',
  cssProperty: 'paddingBottom',
  transformValue: function transformValue(n) {
    return n * 100 + '%'
  },
})
exports.ratioPadding = ratioPadding

var ratio = function ratio(props) {
  return props.ratio
    ? (0, _extends3.default)(
        {
          height: 0,
        },
        ratioPadding(props)
      )
    : null
}

exports.ratio = ratio
ratio.propTypes = (0, _extends3.default)({}, ratioPadding.propTypes)
var verticalAlign = style({
  prop: 'verticalAlign',
}) // flexbox

exports.verticalAlign = verticalAlign
var alignItems = style({
  prop: 'alignItems',
})
exports.alignItems = alignItems
var alignContent = style({
  prop: 'alignContent',
})
exports.alignContent = alignContent
var justifyItems = style({
  prop: 'justifyItems',
})
exports.justifyItems = justifyItems
var justifyContent = style({
  prop: 'justifyContent',
})
exports.justifyContent = justifyContent
var flexWrap = style({
  prop: 'flexWrap',
})
exports.flexWrap = flexWrap
var flexBasis = style({
  prop: 'flexBasis',
  transformValue: getWidth,
})
exports.flexBasis = flexBasis
var flexDirection = style({
  prop: 'flexDirection',
})
exports.flexDirection = flexDirection
var flex = style({
  prop: 'flex',
})
exports.flex = flex
var justifySelf = style({
  prop: 'justifySelf',
})
exports.justifySelf = justifySelf
var alignSelf = style({
  prop: 'alignSelf',
})
exports.alignSelf = alignSelf
var order = style({
  prop: 'order',
}) // grid

exports.order = order
var gridGap = style({
  prop: 'gridGap',
  transformValue: px,
  key: 'space',
})
exports.gridGap = gridGap
var gridColumnGap = style({
  prop: 'gridColumnGap',
  transformValue: px,
  key: 'space',
})
exports.gridColumnGap = gridColumnGap
var gridRowGap = style({
  prop: 'gridRowGap',
  transformValue: px,
  key: 'space',
})
exports.gridRowGap = gridRowGap
var gridColumn = style({
  prop: 'gridColumn',
})
exports.gridColumn = gridColumn
var gridRow = style({
  prop: 'gridRow',
})
exports.gridRow = gridRow
var gridAutoFlow = style({
  prop: 'gridAutoFlow',
})
exports.gridAutoFlow = gridAutoFlow
var gridAutoColumns = style({
  prop: 'gridAutoColumns',
})
exports.gridAutoColumns = gridAutoColumns
var gridAutoRows = style({
  prop: 'gridAutoRows',
})
exports.gridAutoRows = gridAutoRows
var gridTemplateColumns = style({
  prop: 'gridTemplateColumns',
})
exports.gridTemplateColumns = gridTemplateColumns
var gridTemplateRows = style({
  prop: 'gridTemplateRows',
})
exports.gridTemplateRows = gridTemplateRows
var gridTemplateAreas = style({
  prop: 'gridTemplateAreas',
})
exports.gridTemplateAreas = gridTemplateAreas
var gridArea = style({
  prop: 'gridArea',
}) // borders

exports.gridArea = gridArea

var getBorder = function getBorder(n) {
  return num(n) && n > 0 ? n + 'px solid' : n
}

var border = style({
  prop: 'border',
  key: 'borders',
  transformValue: getBorder,
})
exports.border = border
var borderTop = style({
  prop: 'borderTop',
  key: 'borders',
  transformValue: getBorder,
})
exports.borderTop = borderTop
var borderRight = style({
  prop: 'borderRight',
  key: 'borders',
  transformValue: getBorder,
})
exports.borderRight = borderRight
var borderBottom = style({
  prop: 'borderBottom',
  key: 'borders',
  transformValue: getBorder,
})
exports.borderBottom = borderBottom
var borderLeft = style({
  prop: 'borderLeft',
  key: 'borders',
  transformValue: getBorder,
})
exports.borderLeft = borderLeft
var borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft
)
exports.borders = borders
var borderColor = style({
  prop: 'borderColor',
  key: 'colors',
})
exports.borderColor = borderColor
var borderRadius = style({
  prop: 'borderRadius',
  key: 'radii',
  transformValue: px,
})
exports.borderRadius = borderRadius
var boxShadow = style({
  prop: 'boxShadow',
  key: 'shadows',
})
exports.boxShadow = boxShadow
var opacity = style({
  prop: 'opacity',
})
exports.opacity = opacity
var overflow = style({
  prop: 'overflow',
}) // backgrounds

exports.overflow = overflow
var background = style({
  prop: 'background',
})
exports.background = background
var backgroundImage = style({
  prop: 'backgroundImage',
})
exports.backgroundImage = backgroundImage
var backgroundSize = style({
  prop: 'backgroundSize',
})
exports.backgroundSize = backgroundSize
var backgroundPosition = style({
  prop: 'backgroundPosition',
})
exports.backgroundPosition = backgroundPosition
var backgroundRepeat = style({
  prop: 'backgroundRepeat',
}) // position

exports.backgroundRepeat = backgroundRepeat
var position = style({
  prop: 'position',
})
exports.position = position
var zIndex = style({
  prop: 'zIndex',
})
exports.zIndex = zIndex
var top = style({
  prop: 'top',
  transformValue: px,
})
exports.top = top
var right = style({
  prop: 'right',
  transformValue: px,
})
exports.right = right
var bottom = style({
  prop: 'bottom',
  transformValue: px,
})
exports.bottom = bottom
var left = style({
  prop: 'left',
  transformValue: px,
})
exports.left = left
var textStyle = variant({
  prop: 'textStyle',
  key: 'textStyles',
})
exports.textStyle = textStyle
var colorStyle = variant({
  prop: 'colors',
  key: 'colorStyles',
})
exports.colorStyle = colorStyle
var buttonStyle = variant({
  key: 'buttons',
})
exports.buttonStyle = buttonStyle
var styles = {
  space: space,
  width: width,
  fontSize: fontSize,
  textColor: textColor,
  bgColor: bgColor,
  color: color,
  fontFamily: fontFamily,
  textAlign: textAlign,
  lineHeight: lineHeight,
  fontWeight: fontWeight,
  fontStyle: fontStyle,
  letterSpacing: letterSpacing,
  display: display,
  maxWidth: maxWidth,
  minWidth: minWidth,
  height: height,
  maxHeight: maxHeight,
  minHeight: minHeight,
  sizeWidth: sizeWidth,
  sizeHeight: sizeHeight,
  size: size,
  ratioPadding: ratioPadding,
  ratio: ratio,
  verticalAlign: verticalAlign,
  alignItems: alignItems,
  alignContent: alignContent,
  justifyItems: justifyItems,
  justifyContent: justifyContent,
  flexWrap: flexWrap,
  flexBasis: flexBasis,
  flexDirection: flexDirection,
  flex: flex,
  justifySelf: justifySelf,
  alignSelf: alignSelf,
  order: order,
  gridGap: gridGap,
  gridColumnGap: gridColumnGap,
  gridRowGap: gridRowGap,
  gridColumn: gridColumn,
  gridRow: gridRow,
  gridAutoFlow: gridAutoFlow,
  gridAutoColumns: gridAutoColumns,
  gridAutoRows: gridAutoRows,
  gridTemplateColumns: gridTemplateColumns,
  gridTemplateRows: gridTemplateRows,
  gridTemplateAreas: gridTemplateAreas,
  gridArea: gridArea,
  // borders
  border: border,
  borderTop: borderTop,
  borderRight: borderRight,
  borderBottom: borderBottom,
  borderLeft: borderLeft,
  borders: borders,
  borderColor: borderColor,
  borderRadius: borderRadius,
  boxShadow: boxShadow,
  opacity: opacity,
  overflow: overflow,
  background: background,
  backgroundImage: backgroundImage,
  backgroundPosition: backgroundPosition,
  backgroundRepeat: backgroundRepeat,
  backgroundSize: backgroundSize,
  position: position,
  zIndex: zIndex,
  top: top,
  right: right,
  bottom: bottom,
  left: left,
  textStyle: textStyle,
  colorStyle: colorStyle,
  buttonStyle: buttonStyle, // mixed
}
exports.styles = styles

var omit = function omit(obj, blacklist) {
  var next = {}

  for (var key in obj) {
    if (blacklist.indexOf(key) > -1) continue
    next[key] = obj[key]
  }

  return next
}

var funcs = Object.keys(styles)
  .map(function(key) {
    return styles[key]
  })
  .filter(function(fn) {
    return typeof fn === 'function'
  })
var blacklist = funcs.reduce(
  function(a, fn) {
    return a.concat(Object.keys(fn.propTypes || {}))
  },
  ['theme']
)

var mixed = function mixed(props) {
  return funcs
    .map(function(fn) {
      return fn(props)
    })
    .reduce(merge, omit(props, blacklist))
}

exports.mixed = mixed