class ShowProduct{
    constructor(
        public name: string,
        public price: number,
        public image: string,
        public parent: HTMLElement,
        public amount?: number,
        public description?: string,
    ){}
};

export default ShowProduct;