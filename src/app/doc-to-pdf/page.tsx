"use client";
import styles from "./doc-to-pdf.module.scss";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { Button, Typography } from "@mui/material";
import { useRef } from "react";

const DocToPdf: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const handleClick = () => {
		if (!fileInputRef.current) return;
		fileInputRef.current?.click();
	};
	return (
		<div className={styles.container}>
			<Typography variant="h4" component="h2" style={{ marginBottom: "10px" }}>
				Convert WORD to PDF
			</Typography>
			<Typography
				variant="subtitle2"
				component="h2"
				style={{ marginBottom: "10px" }}
			>
				Make DOC and DOCX files easy to read by converting them to PDF.
			</Typography>

			<input type="file" accept=".docx" hidden ref={fileInputRef} />
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
	);
};

export default DocToPdf;
