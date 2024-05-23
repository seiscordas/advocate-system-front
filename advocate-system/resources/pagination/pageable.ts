export interface ApiResponse<T> {
    content: T[]; // 'T' será substituído pelo tipo específico ao usar a interface
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: { sorted: boolean; unsorted: boolean; empty: boolean };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}


// export type Pageable = {
//     pageNumber: number,
//     pageSize: number,
//     sort: { 
//         sorted: boolean,
//         unsorted: boolean,
//         empty: boolean
//     };
//     offset: number,
//     paged: boolean,
//     unpaged: boolean,
// }

// export type Pagination = {
//     totalPages: number,
//     totalElements: number,
//     last: boolean,
//     sort: {
//         sorted: boolean,
//         unsorted: boolean,
//         empty: boolean
//     },
//     first: boolean,
//     size: number,
//     number: number,
//     numberOfElements: number,
//     empty: boolean
// }