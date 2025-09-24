// products.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { environment } from 'environments/environment';
import { LsProduct, LsResAll, LsResCreate, LsResMessage } from '@models/products.models';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.url_api}/products`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if ID is available', () => {
    const testId = '123';
    const mockResponse = true;

    service.validateAvaibleId(testId).subscribe(res => {
      expect(res).toBe(true);
    });

    const req = httpMock.expectOne(`${baseUrl}/verification/${testId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get all products', () => {
    const mockResponse: LsResAll = { data: [] };

    service.getAll().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a new product', () => {
    const product: LsProduct = {
      id: '1',
      name: 'Test',
      description: 'desc',
      logo: 'https://logo.url/img.png',
      date_release: new Date('2025-09-24'),
      date_revision: new Date('2025-09-25')
    };
    const mockResponse: LsResCreate = { message: 'Created', data: product };

    service.createProduct(product).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);
    req.flush(mockResponse);
  });

  it('should edit a product', () => {
    const id = '1';
    const product: LsProduct = {
      id: '1',
      name: 'Updated',
      description: 'desc updated',
      logo: 'https://logo.url/img.png',
      date_release: new Date('2025-09-24'),
      date_revision: new Date('2025-09-26')
    };
    const mockResponse: LsResCreate = { message: 'Updated', data: product };

    service.editProduct(id, product).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(product);
    req.flush(mockResponse);
  });

  it('should delete a product', () => {
    const id = '1';
    const mockResponse: LsResMessage = { message: 'Deleted' };

    service.deleteProduct(id).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});
