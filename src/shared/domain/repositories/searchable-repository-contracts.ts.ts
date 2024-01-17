import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contract';

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page: number;
  protected _perPage: number = 15;
  protected _sort: string | null;
  protected _sortDir: SortDirection | null;
  protected _filter: string | null;

  constructor(props: SearchProps) {
    this._page = props.page;
    this._perPage = props.perPage;
    this._sort = props.sort;
    this._sortDir = props.sortDir;
    this._filter = props.filter;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {}

  get perPage(): number {
    return this._perPage;
  }

  private set perPage(value: number) {}

  get sort(): string {
    return this._sort;
  }

  private set sort(value: string | null) {}

  get sortDir(): SortDirection {
    return this._sortDir;
  }

  private set sortDir(value: string | null) {}

  get filter(): string {
    return this._filter;
  }

  private set filter(value: string | null) {}
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}