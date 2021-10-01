import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Element, ElementType } from 'src/app/interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input()
  public set elements(elements: Array<Element>) {
    /** We want to show same type elements in same column */
    elements.forEach((element) => {
      const type = element.type.split('@').shift();
      this.elementTypeMap[type] ? this.elementTypeMap[type].push(element) : (this.elementTypeMap[type] = [element]);
    });
    Object.keys(this.elementTypeMap).forEach((type) => (this.elementCountPerType[type] = this.elementTypeMap[type].length));
  }

  @Output()
  public selected: EventEmitter<string> = new EventEmitter<string>();

  public elementTypeMap: { [type: string]: Array<Element> } = {};
  public elementTypes: Array<ElementType> = [];
  public elementCountPerType: { [type: string]: number } = {};
  public selectedElement: Element = null;
  private elementTypeSubscription: Subscription;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.elementTypeSubscription = this.mainService
      .getAllElementTypes()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          res.forEach((type) => {
            this.elementTypes.find((et) => et.uri === type.uri.split('@').shift()) ||
              this.elementTypes.push({
                ...type,
                uri: type.uri.split('@').shift()
              });
          });
        }
      });
  }

  public get rows(): Array<undefined> {
    return new Array(Math.max(...Object.values(this.elementCountPerType), 0));
  }

  public onClicked(element: Element) {
    if (element) {
      this.selected.emit(element.uri);
      this.selectedElement = element;
    }
  }

  ngOnDestroy() {
    if (this.elementTypeSubscription) {
      this.elementTypeSubscription.unsubscribe();
    }
  }
}
