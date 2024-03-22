import Types from "../types";
export const controller = ({
  children,
  ...props
}: React.SVGProps<SVGSVGElement> & { children?: React.ReactNode }): React.ReactElement => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width={props.width ?? "24"}
    height={props.height ?? "24"}
    style={props.style}>
    <path
      style={{
        fill: "currentColor",
      }}
      d="M17 2H7C4.8 2 3 3.8 3 6V18C3 20.2 4.8 22 7 22H17C19.2 22 21 20.2 21 18V6C21 3.8 19.2 2 17 2ZM10.86 18.14C10.71 18.29 10.52 18.36 10.33 18.36C10.14 18.36 9.95 18.29 9.8 18.14L9.15 17.49L8.53 18.11C8.38 18.26 8.19 18.33 8 18.33C7.81 18.33 7.62 18.26 7.47 18.11C7.18 17.82 7.18 17.34 7.47 17.05L8.09 16.43L7.5 15.84C7.21 15.55 7.21 15.07 7.5 14.78C7.79 14.49 8.27 14.49 8.56 14.78L9.15 15.37L9.77 14.75C10.06 14.46 10.54 14.46 10.83 14.75C11.12 15.04 11.12 15.52 10.83 15.81L10.21 16.43L10.86 17.08C11.15 17.37 11.15 17.85 10.86 18.14ZM14.49 18.49C13.94 18.49 13.49 18.05 13.49 17.5V17.48C13.49 16.93 13.94 16.48 14.49 16.48C15.04 16.48 15.49 16.93 15.49 17.48C15.49 18.03 15.04 18.49 14.49 18.49ZM16.51 16.33C15.96 16.33 15.5 15.88 15.5 15.33C15.5 14.78 15.94 14.33 16.49 14.33H16.51C17.06 14.33 17.51 14.78 17.51 15.33C17.51 15.88 17.06 16.33 16.51 16.33ZM18 9.25C18 10.21 17.21 11 16.25 11H7.75C6.79 11 6 10.21 6 9.25V6.75C6 5.79 6.79 5 7.75 5H16.25C17.21 5 18 5.79 18 6.75V9.25Z"
    />
    {children}
  </svg>
);

export const music = ({
  children,
  ...props
}: React.SVGProps<SVGSVGElement> & { children?: React.ReactNode }): React.ReactElement => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width={props.width ?? "24"}
    height={props.height ?? "24"}
    style={props.style}>
    <path
      style={{
        fill: "currentColor",
      }}
      d="M11.513 2.048a.75.75 0 0 0-1.013.702v12.127a4 4 0 1 0 1.476 3.56.749.749 0 0 0 .024-.187V8.832l6.987 2.62A.75.75 0 0 0 20 10.75V7.483a3.25 3.25 0 0 0-2.109-3.044l-6.378-2.391Z"
    />
    {children}
  </svg>
);

export const noLive = ({
  children,
  ...props
}: React.SVGProps<SVGSVGElement> & { children?: React.ReactNode }): React.ReactElement => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width={props.width ?? "24"}
    height={props.height ?? "24"}
    style={props.style}>
    <path
      style={{
        fill: "currentColor",
      }}
      d="M3.28 2.22a.75.75 0 1 0-1.06 1.06l2.202 2.203c-3.392 3.93-3.223 9.872.506 13.601a1 1 0 0 0 1.415-1.414A8.004 8.004 0 0 1 5.84 6.902l1.521 1.52a5.922 5.922 0 0 0 .533 7.763A1 1 0 0 0 9.31 14.77a3.922 3.922 0 0 1-.513-4.913l1.836 1.836a1.5 1.5 0 0 0 1.838 1.838l8.25 8.25a.75.75 0 0 0 1.06-1.061L3.28 2.22ZM19.028 15.846l1.461 1.462c2.414-3.861 1.943-9.012-1.415-12.37a1 1 0 1 0-1.414 1.415 8.006 8.006 0 0 1 1.368 9.493Z"
    />
    <path
      style={{
        fill: "currentColor",
      }}
      d="m15.93 12.748 1.59 1.591a5.922 5.922 0 0 0-1.252-6.527 1 1 0 1 0-1.415 1.414 3.916 3.916 0 0 1 1.077 3.522Z"
    />
    {children}
  </svg>
);

export const close = ({
  children,
  ...props
}: React.SVGProps<SVGSVGElement> & { children?: React.ReactNode }): React.ReactElement => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    width={props.width ?? "24"}
    height={props.height ?? "24"}
    style={props.style}>
    <path
      style={{
        fill: "currentColor",
      }}
      d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
    />
    {children}
  </svg>
);

export default { controller, music, noLive, close };
