import React from 'react'

export default function Element({
  type,
  props = {},
  children,
  key,
  className,
  style,
  isEditorMode,
  handleClick,
}) {
  const innerChildren = Array.isArray(children)
    ? children.map((child, index) => (
        <Element
          isEditorMode={isEditorMode}
          key={child.key || index}
          handleClick={handleClick}
          {...child}
        />
      ))
    : children
  const computedClassNames = `${className} relative before:w-full before:h-full before:absolute before:bottom-0 before:right-0 before:duration-50 before:border-transparent hover:before:border-1 hover:before:border-red-500`
  return React.createElement(
    type,
    {
      ...props,
      key,
      className: computedClassNames,
      style,
      onClick: (e) =>
        handleClick &&
        handleClick(e, { type, props, children, key, className, style }),
    },
    innerChildren
  )
}
