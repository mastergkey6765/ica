import { jsPDF } from 'jspdf';

export const generateCertificate = async (
  userName: string,
  courseTitle: string,
  completionDate: Date,
  certificateId: string
) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [11, 8.5]
  });

  // White background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 11, 8.5, 'F');

  // Decorative border (Navy and Gold)
  doc.setFillColor(15, 30, 50); // Navy corner
  doc.triangle(0, 0, 0, 3, 3, 0);
  doc.triangle(11, 8.5, 11, 5.5, 8, 8.5);

  doc.setFillColor(218, 165, 32); // Gold corner details
  doc.triangle(0, 0, 0, 1.5, 1.5, 0);
  doc.triangle(11, 8.5, 11, 7, 9.5, 8.5);

  // Logo (try to load public logo if possible, but jsPDF needs base64)
  // We'll skip the image logo to ensure it works reliably, or use a text logo
  doc.setTextColor(15, 30, 50); // Navy text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("THE ICA INSTITUTE OF DEMENTIA INTELLIGENCE™", 5.5, 2, { align: "center" });

  // Gold line
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.02);
  doc.line(3.5, 2.3, 7.5, 2.3);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text("Be it known that", 5.5, 3, { align: "center" });

  // Name
  doc.setFont("times", "italic");
  doc.setFontSize(36);
  doc.setTextColor(0, 0, 0);
  doc.text(userName, 5.5, 4, { align: "center" });

  // Gold line under name
  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.01);
  doc.line(3, 4.2, 8, 4.2);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(15, 30, 50); // Navy text
  
  // Custom text per course or generic
  const isATDIT = courseTitle.toLowerCase().includes("atdit") || courseTitle.toLowerCase().includes("advanced transactional dementia intelligence");
  
  if (isATDIT) {
    doc.text(`has completed the ${courseTitle}`, 5.5, 4.8, { align: "center" });
    doc.text("and is an accredited ATDIT practitioner of", 5.5, 5.2, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Transactional Dementia Intelligence™", 5.5, 5.8, { align: "center" });
  } else {
    doc.text(`has completed the course`, 5.5, 4.8, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(courseTitle, 5.5, 5.3, { align: "center" });
  }

  // Date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  doc.text(`Certified ${completionDate.toLocaleDateString('en-US', options)}`, 5.5, 6.5, { align: "center" });
  doc.setFontSize(12);
  doc.text("Conferred by the Authority of", 5.5, 6.8, { align: "center" });

  // Signatures
  // Signature 1
  doc.setFont("times", "italic");
  doc.setFontSize(18);
  doc.text("Ethelle G. Lord", 3, 7.5, { align: "center" });
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.01);
  doc.line(2, 7.6, 4, 7.6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Dr. Ethelle G. Lord", 3, 7.8, { align: "center" });
  doc.text("ICA Founder", 3, 8.0, { align: "center" });

  // Signature 2
  doc.setFont("times", "italic");
  doc.setFontSize(18);
  doc.text("Jennifer Stelter", 8, 7.5, { align: "center" });
  doc.line(7, 7.6, 9, 7.6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Dr. Jennifer Stelter", 8, 7.8, { align: "center" });
  doc.text("VP Education", 8, 8.0, { align: "center" });

  // Certificate ID small text at the bottom left
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Certificate ID: ${certificateId}`, 0.5, 8.2);

  doc.save(`${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`);
};
