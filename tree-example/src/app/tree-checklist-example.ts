//import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';

/**
 * Node for to-do item
 */
export class TodoItemNodel {
  children: TodoItemNodel[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
 "Country" :{}

};

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNodel[]>([]);

  get data(): TodoItemNodel[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNodel[] {
    return Object.keys(obj).reduce<TodoItemNodel[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNodel();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNodel, name: string) {
    if (parent.children) {
      parent.children.push({item: name} as TodoItemNodel);
        
    }
    else
    {
      parent.children = [{
        item:name,
        children :[]
      }];
    }
     this.dataChange.next(this.data); 
  }
  insertItemAtRoot() {
     this.data.push({item:'',children:[],});
     this.dataChange.next(this.data);
  }

  deleteItem(node:TodoItemNodel){
    for(let i = 0; i < this.data.length; i++)
    {
        if(this.data[i].item == node.item)
        {
           this.data.splice(i, 1);
        }
        else
        {
          this.data[i].children = this.findAndDeleteRecursively(this.data[i].children, node);
        }
    }
    this.dataChange.next(this.data);
  }

  findAndDeleteRecursively(children : TodoItemNodel[], node : TodoItemNodel)
  {
    for(let i = 0; i < children.length; i++)
      if(children[i].item == node.item)
      {
        children = children.splice(i + 1, 1);
        return children;
      }
      else 
      {
       children[i].children = this.findAndDeleteRecursively(children[i].children, node);
       return children;
      }
  }
  updateItem(node: TodoItemNodel, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
    
  }
}


@Component({
  selector: 'tree-checklist-example',
  templateUrl: 'tree-checklist-example.html',
  styleUrls: ['tree-checklist-example.css'],
  providers: [ChecklistDatabase]
})
export class TreeChecklistExample {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNodel>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNodel, TodoItemFlatNode>();

  /** The new item's name */
  //newItemName = '';

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNodel, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNodel, TodoItemFlatNode>;


  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }
 
  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => true;

  getChildren = (node: TodoItemNodel): TodoItemNodel[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => true;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNodel, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: TodoItemFlatNode) {
    node.expandable=true;
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
  addIncollection()
  {
    this._database.insertItemAtRoot();
  }

  deleteItem(node:TodoItemNodel){

    this._database.deleteItem(node);
    
  }
}

