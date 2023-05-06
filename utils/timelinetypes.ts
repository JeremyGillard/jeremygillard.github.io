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
    details: string;
    description: string;
    tags: Tag[];
}

export { Category, Tag, Job };
