import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DivisionService } from "src/app/service/division.service";

export interface Division {
  id: number,
  name: string,
  parent: any,
  children: any
}

@Component({
  selector: 'app-add-division',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})


export class AddDivisionComponent implements OnInit {

  addDivisionData: any
  router: any
  divisions: any = [];
  resp!: Division

  constructor(private divisionService: DivisionService, router: ActivatedRoute,private routerLink: Router) {
    this.router = router;
  }
  ngOnInit(): void {
    this.addDivisionData = new FormGroup({
      name: new FormControl(),
      parent: new FormControl()
     
    });

    this.divisionService.getDivision(this.router.snapshot.params['id']).subscribe(response => {
     this.resp = response
      console.log(this.resp)
     
      this.addDivisionData.controls['name'].setValue(this.resp.name)
      this.addDivisionData.controls['parent'].setValue(this.resp.parent.id)

    })

    this.divisionService.getDivisions().subscribe({
      next: resp => {
        this.divisions=resp
      },
      error: err => {
        console.log(err.error.message)
      }
    })

   
  }

  addDivision() {

    console.log(this.addDivisionData.value)
    this.divisionService.addDivision(this.addDivisionData.value).subscribe({
      next: data => {
        alert("successfully submitted!")
        this.routerLink.navigate(["divisions"])
      },
      error: er => {
        alert("operation is not successful! "+er.error.message)
      }
    })
  }
  updateDivision() {
    console.log("from update: " + this.addDivisionData.value)
    return this.divisionService.updateDivision(this.addDivisionData.value, this.router.snapshot.params['id']).subscribe(response => {
      console.log(response)
      this.routerLink.navigate(["divisions"])
    })
  }

}