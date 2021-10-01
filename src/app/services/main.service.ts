import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Element, ElementType } from '../interface';
import { MyCollection } from '../mockData/elements';
import { JapaneseElementTypes, LocalElementTypes } from '../mockData/elementTypes';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  /** Cached mock data */
  private readonly elementTypes: Array<ElementType> = LocalElementTypes.concat(JapaneseElementTypes);
  private readonly allElements: Array<Element> = MyCollection;

  constructor() {}

  public getAllElements(): Observable<Array<Element>> {
    return of(this.allElements);
  }

  public getAllElementTypes(): Observable<Array<ElementType>> {
    return of(this.elementTypes);
  }
}
