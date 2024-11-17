import { Subject } from 'rxjs';

export const loadingSubject = new Subject();

export const showLoading = () => loadingSubject.next(true);
export const hideLoading = () => loadingSubject.next(false); 