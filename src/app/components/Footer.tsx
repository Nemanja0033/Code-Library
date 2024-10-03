export default function Footer(){
    return(
        <div className="mt-20">
        <div className="bg-black text-white py-8">
            <div className="container mx-auto px-4 flex justify-between">
                <div>
                    <h3 className="font-bold mb-2">Code Commerce</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Categories</h3>
                    <ul>
                        <li>Web Development</li>
                        <li>Data Science</li>
                        <li>Mobile Development</li>
                        <li>Game Development</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Resources</h3>
                    <ul>
                        <li>Blog</li>
                        <li>FAQs</li>
                        <li>Support</li>
                        <li>Community</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Partners</h3>
                    <ul>
                        <li>Affiliate Program</li>
                        <li>Author Program</li>
                        <li>Corporate Sales</li>
                    </ul>
                </div>
            </div>
            <br />
            <div className="text-center mt-4 text-muted-foreground">
                Copyright© 2023 Code Commerce. All rights reserved.
            </div>
        </div>
    </div>
);
}