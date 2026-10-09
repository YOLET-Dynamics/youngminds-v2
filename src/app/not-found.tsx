import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap narrow center stack">
        <p className="serif text-[clamp(6rem,4rem+10vw,11rem)] leading-none text-forest tracking-[-.04em]">404</p>
        <h1 className="h1">This page wandered off.</h1>
        <p className="lead center-x">The link may be old or mistyped. These might help:</p>
        <div className="btn-row justify-center">
          <Link className="btn btn-primary" href="/">
            Go home
          </Link>
          <Link className="btn btn-outline" href="/events">
            See events
          </Link>
          <Link className="btn btn-outline" href="/donate">
            Donate
          </Link>
        </div>
      </div>
    </section>
  );
}
