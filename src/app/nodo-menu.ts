export class NodoMenu {
  title: string;
  link: string;
  component: string;
  children: NodoMenu[];

  constructor(
    title: string,
    link: string,
    component: string
  ) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(child: NodoMenu): void {
    this.children.push(child);
  }
}