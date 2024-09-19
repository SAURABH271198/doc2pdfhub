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
	const [file, setFile] = useState<File>();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		setFile(file);
		if (file) {
			const reader = new FileReader();

			// When the file is loaded, set the base64 result
			reader.onloadend = () => {
				const result = reader.result as string;
				setBase64(result.split(",")[1]);
			};

			// Read the file as a data URL
			reader.readAsDataURL(file);
		}
	};

	const handleClick = () => {
		if (!fileInputRef.current) return;
		fileInputRef.current?.click();
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
					accept=".docx"
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
							{file?.name}
						</Typography>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: "20px",
						}}
					>
						<Button variant="contained">
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
