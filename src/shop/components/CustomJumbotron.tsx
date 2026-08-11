interface Props {
    title: string;
    subTtitle?: string;
}

export const CustomJumbotron = ({ title, subTtitle }: Props) => {

    const defaultSubtitle = "Ropa elegante inspirada en el diseño Tesla";

    return (
        <section className="py-10 px-4 lg:px-8 bg-muted/30">
            <div className="container mx-auto text-center">
                <h1 className="font-primary text-3xl lg:text-5xl tracking-tight mb-6">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {subTtitle || defaultSubtitle}
                </p>
            </div>
        </section>
    )
}