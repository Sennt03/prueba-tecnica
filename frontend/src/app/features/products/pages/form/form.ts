import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '@services/products.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Alerts } from '@shared/utils/alerts';
import { createFormHelper } from '@shared/utils/error-forms';
import { MyValidators } from '@shared/utils/myValidators';

@Component({
  selector: 'app-form',
  imports: [RouterLink, ReactiveFormsModule, LoadingComponent],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit{
  private productsService = inject(ProductsService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  helperForm = () => createFormHelper(this.form);
  loading = signal(false)
  edit = signal<string>('')

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id')
      if(!id) return
  
      this.edit.set(id)
      let data: any = localStorage.getItem('active')
      try{
        data = JSON.parse(data)
      }catch(err){
        data = {}
      }
  
      if(data && data?.id == id){
        this.form.patchValue(data)
        this.form.get('id')?.disable()
        this.form.get('id')?.clearAsyncValidators()
        this.form.get('id')?.clearValidators()
      }
    })
  }

  buildForm() {
    // USA VALIDACIONES PERSONALIZADAS, ASINCRONAS Y GRUPALES
    this.form = this.formBuilder.group({
      id: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
        MyValidators.validIdUnique(this.productsService),
      ],
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required,  Validators.pattern(/^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/)]],
      date_release: ['', [Validators.required, MyValidators.validateLiberationDate]],
      date_revision: [{ value: '', disabled: true }, [Validators.required]],
    },
    {
      validators: [MyValidators.releaseRequiresRevision()]
    });
  }

  onReleaseDateChange(event: Event) {
    const releaseDate = (event.target as HTMLInputElement).value;
    if (releaseDate) {
      const date = new Date(releaseDate);
      if (!isNaN(date.getTime())) {
        date.setFullYear(date.getFullYear() + 1);
        try{
          const formattedReviewDate = date.toISOString().substring(0, 10);
          this.form.get('date_revision')?.patchValue(formattedReviewDate);
        }catch(err){
          this.form.get('date_revision')?.patchValue('');
        }
        return
      }

      this.form.get('date_revision')?.patchValue('');
      return
    } 

    this.form.get('date_revision')?.patchValue('');
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true)
    const sub = this.edit() 
    ? this.productsService.editProduct(this.edit(), this.form.getRawValue())
    : this.productsService.createProduct(this.form.getRawValue())
    
    sub.subscribe({
      next: res => {
        
        setTimeout(() => {
          Alerts.success(res.message, "Success");
          this.loading.set(false)
          this.router.navigate(['/products'])
        }, 400)

      },
      error: err => {
        this.loading.set(false)
        const text = this.edit() ? 'editing' : 'creating'
        Alerts.error(`Error ${text} product`, "Error");
      },
    })
  }

  cleanForm(){
    this.form.reset()
    if(this.edit()){
      this.form.patchValue({
        id: this.edit()
      })
    }
  }
}
