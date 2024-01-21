import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  Subject,
  catchError,
  debounce,
  debounceTime,
  of,
  switchMap,
  takeUntil,
} from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <!-- set the input at center -->
    <div class="input-center">
      <input
        type="text"
        name="debounce"
        id="debounce"
        placeholder="Enter here"
        class="input-field"
        autofocus
        [formControl]="debounce"
      />
    </div>
  `,
  styles: `
  .input-center {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .input-field {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    font-size: 1.2rem;
    width: 300px;
  }

`,
})
export class AppComponent {
  #http = inject(HttpClient);
  debounce = new FormControl("");

  constructor() {
    this.debounce.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) =>
          this.#http.get(`https://api.realworld.io/api/articles?tag=${value}`)
        )
      )
      .subscribe((res) => console.log(res));
  }
}
