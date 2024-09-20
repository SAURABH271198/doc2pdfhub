import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

// Define the POST function for the route
export async function POST(req: NextRequest) {
	try {
		const { base64, filename }: { base64: string; filename: string } =
			await req.json();

		if (!base64 || !filename) {
			return NextResponse.json(
				{ error: "Invalid input: base64 or filename missing." },
				{ status: 400 }
			);
		}

		// Launch Puppeteer and create a PDF
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		// Decode the base64 content and set it as HTML content in Puppeteer
		const content = Buffer.from(base64, "base64").toString("utf-8");
		await page.setContent(content);

		// Generate PDF from the page
		const pdfBuffer = await page.pdf({
			format: "A4",
			printBackground: true,
		});

		await browser.close();

		return new NextResponse(pdfBuffer, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename=output.pdf`,
			},
		});
	} catch (err) {
		console.error("Error converting file:", err);
		return NextResponse.json(
			{ error: "Failed to convert file to PDF." },
			{ status: 500 }
		);
	}
}
