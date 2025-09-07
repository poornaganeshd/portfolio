export default function ContactPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4 text-gray-600">
        You can reach me at{" "}
        <a
          href="mailto:your@email.com"
          className="text-blue-500 underline"
        >
          your@email.com
        </a>
      </p>
    </main>
  );
}
