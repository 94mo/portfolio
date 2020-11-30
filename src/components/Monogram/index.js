import classNames from 'classnames';
import { useId } from 'hooks';
import './index.css';

function Monogram({ highlight, className, ...props }) {
  const id = useId();
  const linearId = `linear-${id}`;
  const clipId = `monogram-clip-${id}`;

  return (
    <svg
      aria-hidden
      className={classNames('monogram', className)}
      width="45"
      height="45"
      viewBox="0 0 16000 16000"
      {...props}
    >
      <defs>
        <linearGradient id={linearId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64bbe8"/>
          <stop offset="80%" stopColor="#c5aed3"/>
        </linearGradient>
        <clipPath id={clipId}>
          <path d=" / " />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} fill={`url(#${linearId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className="monogram__highlight" width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
}

export default Monogram;
