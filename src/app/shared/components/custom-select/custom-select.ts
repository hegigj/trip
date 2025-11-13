import {Component, input, signal} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {ISelectOption} from '../../interfaces/select-option.interface';

@Component({
  selector: 'custom-select',
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomSelect,
      multi: true
    }
  ],
  templateUrl: './custom-select.html',
})
export class CustomSelect implements ControlValueAccessor {
  public label = input.required<string>();
  public options = input.required<ISelectOption[]>();

  protected value = signal<any>(null);

  onChange = (value: any) => {};
  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value.set(value);
  }

  protected onSelect(event: Event): void {
    this.onTouched();
    this.onChange((event.target as HTMLSelectElement).value);
  }
}
