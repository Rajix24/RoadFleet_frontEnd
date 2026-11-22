import { ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Home page</h1>

            <div className="flex gap-2">
                <Button
                    className="rounded-full"
                    onClick={() => {
                        navigate("/login");
                    }}
                >   
                Get Started
                </Button>
            </div>
        </>
    );
}