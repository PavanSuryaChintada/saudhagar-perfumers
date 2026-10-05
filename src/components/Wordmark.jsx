// Typeset recreation of the Saudagar logo lock-up, so it stays crisp at any size.
export default function Wordmark({ size = 'md', tagline = true, className = '' }) {
  return (
    <span className={`wordmark wordmark--${size} ${className}`} aria-label="Saudagar Perfumers">
      <span className="wordmark__main" aria-hidden="true">
        Saudagar<sup>™</sup>
      </span>
      <span className="wordmark__sub" aria-hidden="true">Perfumers</span>
      {tagline && (
        <>
          <span className="wordmark__rule" aria-hidden="true" />
          <span className="wordmark__tag" aria-hidden="true">Premium Fragrances</span>
          <span className="wordmark__rule wordmark__rule--short" aria-hidden="true" />
        </>
      )}
    </span>
  )
}
