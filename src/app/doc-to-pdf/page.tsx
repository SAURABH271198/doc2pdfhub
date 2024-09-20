"use client";
import styles from "./doc-to-pdf.module.scss";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { Button, Typography } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const DocToPdf: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [base64, setBase64] = useState("");
	const [selectedFile, setSelectedFile] = useState<File>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		setSelectedFile(file);
		if (file) {
			const reader = new FileReader();

			// When the file is loaded, set the base64 result
			reader.onloadend = () => {
				const result = reader.result as string;
				// setBase64(result.split(",")[1]);
				setBase64(result);
			};

			// Read the file as a data URL
			reader.readAsDataURL(file);
		}
	};

	const handleClick = () => {
		if (!fileInputRef.current) return;
		fileInputRef.current?.click();
	};

	const handleConvert = async () => {
		if (!selectedFile) {
			setError("Please select a file.");
			return;
		}

		setLoading(true);

		try {
			const res = await fetch("/api/convert-to-pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					base64: base64,
					filename: selectedFile.name,
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to convert the file.");
			}

			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = url;
			a.download = "downloaded-file.pdf";
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
		} catch (err) {
			console.error(err);
			setError("An error occurred during conversion.");
		} finally {
			setLoading(false); // Stop loading indicator
		}
	};

	return (
		<>
			<div className={styles.container}>
				<Typography
					variant="h4"
					component="h2"
					style={{ marginBottom: "10px" }}
				>
					Convert WORD to PDF
				</Typography>
				<Typography
					variant="subtitle2"
					component="h2"
					style={{ marginBottom: "10px" }}
				>
					Make DOC and DOCX files easy to read by converting them to PDF.
				</Typography>

				<input
					type="file"
					accept=".doc"
					hidden
					ref={fileInputRef}
					onChange={handleFileChange}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClick}
					size="large"
				>
					<FileUploadIcon />
					&nbsp;&nbsp;Select Doc File
				</Button>
			</div>
			{base64 && (
				<>
					<div className={styles.fileContent}>
						<FileCopyIcon sx={{ height: "200px", width: "440px" }} />
						<Typography variant="body1" style={{ textAlign: "center" }}>
							{selectedFile?.name}
						</Typography>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "20px",
						}}
					>
						<Button
							variant="contained"
							onClick={handleConvert}
							disabled={!selectedFile}
						>
							Convert&nbsp;&nbsp;
							<ArrowForwardIcon />
						</Button>
					</div>
				</>
			)}
		</>
	);
};

export default DocToPdf;
