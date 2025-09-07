export default function ContactPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Contact Me</h1>
      <p className="mt-4">Let’s connect!</p>
      <div className="mt-6 flex justify-center gap-6">
        <a href="https://github.com/poornaganeshd" className="text-blue-600">GitHub</a>
        <a href="https://www.linkedin.com/in/poornaganesh-d-552265290/" className="text-blue-600">LinkedIn</a>
        <a href="poornaganesh.d@gmail.com" className="text-blue-600">Email</a>
      </div>
    </div>
  );
}
