export default function AboutPage() {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-6">Welcome to CodeCommerce!</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <p className="text-center text-lg mb-4">
                    Welcome to CodeCommerce, your ultimate destination for high-quality programming eBooks and resources tailored to elevate your coding journey. 
                    At CodeCommerce, we believe that everyone, from beginners to seasoned developers, deserves access to the tools and knowledge necessary to succeed 
                    in the fast-paced world of technology.
                </p>
            </div>
            <h2 className="text-3xl font-semibold text-center mb-6">How It Works?</h2>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <p className="text-center text-lg mb-4">
                    CodeCommerce is an eBook Web Store where you can purchase and download eBooks from our various programming library. 
                    When you purchase an e-book, you will get redirected to the success purchase page when you get the download link. 
                    After a download you can learn and enjoy!
                </p>
            </div>
            <h2 className="text-3xl font-semibold text-center mb-6">Our Library</h2>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <p className="text-center text-lg mb-4">
                    At CodeCommerce, we offer a diverse range of eBooks that cater to programmers of all skill levels. Whether you are just starting out or looking to deepen your knowledge, 
                    our collection covers essential programming languages and topics, including:
                </p>
                <ul className="list-disc list-inside text-lg">
                    <li className="mb-2"><strong>JavaScript:</strong> Dive into the world of web development with our JavaScript eBooks, featuring everything from basics to advanced frameworks.</li>
                    <li className="mb-2"><strong>Python:</strong> Explore the versatility of Python with resources that cover data analysis, machine learning, web development, and more.</li>
                    <li className="mb-2"><strong>Java:</strong> Enhance your understanding of Java with eBooks that delve into object-oriented programming, application development, and design patterns.</li>
                    <li className="mb-2"><strong>C:</strong> Master the fundamentals of programming with our C language resources, perfect for understanding core concepts and system-level programming.</li>
                    <li className="mb-2"><strong>PHP:</strong> Learn to build dynamic web applications with our comprehensive PHP eBooks, covering everything from server-side scripting to popular frameworks.</li>
                    <li className="mb-2">... and more! Our library is continuously expanding, offering resources in languages like Ruby, Swift, Go, and beyond.</li>
                </ul>
            </div>
        </div>
    );
}
