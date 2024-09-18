"use client";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import "./global.scss";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const handleClick = () => {
		router.push("/doc-to-pdf");
	};
	return (
		<div className="card-container">
			<Card className="card" onClick={handleClick}>
				<CardContent>
					<Typography variant="h6">Word to pdf</Typography>
					<Typography variant="body1">
						Make DOC and DOCX files easy to read by converting them to PDF.
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
}
