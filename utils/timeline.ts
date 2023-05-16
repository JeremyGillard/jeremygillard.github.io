enum Category {
    Library = "Library",
    Language = "Language",
    Tools = "Tools",
    Field = "Field",
}

interface Tag {
    name: string;
    category: Category;
}

interface Job {
    title: string;
    startDate: string;
    endDate: string;
    company: string;
    contractType: string;
    description: string;
    tags: Tag[];
}

function colorByCategory(category: Category): string {
    switch (category) {
        case Category.Language:
        return "#ffd772";
        case Category.Library:
        return "#7299ff";
        case Category.Tools:
        return "#b072ff";
        case Category.Field:
        return "#72ddff";
        default:
        return "#DDDDDD";
    }
}

function formatPeriod(startDate: string, endDate: string): string {
    return `${startDate} - ${endDate}`;
}

function formatDetails(company: string, contractType: string): string {
    let details = "";
  if (company) {
    details += `at ${company}`;
  }
  if (contractType) {
    details += ` [${contractType}]`;
  }
  return details;
}

function timelineSectioName(index: number): string {
    return `timeline-section-${index}`;
  }

export { Category, Tag, Job, colorByCategory, formatPeriod, formatDetails, timelineSectioName };
