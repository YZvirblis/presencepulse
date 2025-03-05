import Link from "next/link";

export default function HomePage() {
  return (
    <section className="container flex flex-col items-center justify-center text-center min-h-screen">
      <h1 className="text-5xl ">PresencePulse</h1>
      <p className="mt-4 text-lg">Monitor and enhance your online presence in real-time.</p>

      <div className="mt-6 space-x-4">
        <Link href="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
        <Link href="/auth/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
    </section>
  );
}
