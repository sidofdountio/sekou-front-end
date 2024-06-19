import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';


@Component({
  selector: 'app-student-tree',
  templateUrl: './student-tree.component.html',
  styleUrls: ['./student-tree.component.css']
})


export class StudentTreeComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}



interface FoodNode {
  name: string,
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Student',
    children: [{name: 'Students'}, {name: 'Student Registed'}],
  }]