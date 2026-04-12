import Link from "next/link";

export default function Home() {
  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      <h1 className="text-center space-y-6">Welcome to Our App</h1>
      <Link href="/auth/login">Sign In / Sign Up</Link>
    </div>
  );
}
