// Magnetic hover button: overflow-hidden shell with a sliding background <span>
// layer. scale(1.03) on hover with cubic-bezier(0.25,0.46,0.45,0.94) — all in
// the .btn-magnetic utility so behaviour stays consistent everywhere.
export default function MagneticButton({
  as = 'button',
  children,
  className = '',
  fillClassName = 'bg-accent',
  ...props
}) {
  const Tag = as
  return (
    <Tag className={`btn-magnetic ${className}`} {...props}>
      <span className={`btn-fill ${fillClassName}`} aria-hidden="true" />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </Tag>
  )
}
