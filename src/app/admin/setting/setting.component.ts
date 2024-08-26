import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/model/course';
import { Level } from 'src/app/model/level';
import { Option } from 'src/app/model/option';
import { Speciality } from 'src/app/model/speciality';
import { CourseService } from 'src/app/service/course.service';
import { LevelService } from 'src/app/service/level.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OptionService } from 'src/app/service/option.service';
import { SpecialityService } from 'src/app/service/speciality.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { AppState } from 'src/app/model/appState';
import { DataState } from 'src/app/model/enumeration/dataState';
import { CustomResponse } from 'src/app/model/custom-response';
import { MessageModalService } from 'src/app/service/message-modal.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit, AfterViewInit {
  optionSize: number = 0;
  appState$: Observable<AppState<CustomResponse>>;
  private dataSubject: BehaviorSubject<CustomResponse> = new BehaviorSubject<CustomResponse>(null);
  readonly DataState = DataState;
  dataSource = new MatTableDataSource<Option>([]);
  displayedColumns: string[] = ['id', 'shortName', 'fullName', 'speciality', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  desable: boolean = true;
  specialitys: Speciality[];
  // specialityForm
  specialityForm = this.fbuild.group({
    name: ['', [Validators.required]]
  });
  // levelForm
  levelForm = this.fbuild.group({
    name: ['', [Validators.required]]
  });
  // optionForm
  optionForm = this.fbuild.group({
    name: ['', [Validators.required]],
    fullName: ['', Validators.required],
    speciality: this.fbuild.group({
      id: ['', [Validators.required]]
    })
  });
  // courseForm
  courseForm = this.fbuild.group({
    title: ['', [Validators.required]],
    credit: ['', [Validators.required]]
  });
  // schoolYear
  schooYearForm=this.fbuild.group({
    
  })

  constructor(private fbuild: FormBuilder,
    private levelService: LevelService,
    private notifierService: NotificationService,
    private specialityService: SpecialityService,
    private optionService: OptionService,
    private courseService: CourseService,
    private messageModaleService: MessageModalService
  ) { }

  ngOnInit(): void {
    this.getSpeciality();
    this.getLevels();
    this.getOptions();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  getLevels() {
    this.levelService.levels$.subscribe(
      (response) => { },
      (error) => {
        console.error("error %d", error);
      }
    );
  }
  // Specislity
  getSpeciality(): void {
    this.specialityService.spacialitys$.subscribe(
      (response) => {
        this.specialitys = response.data.specialities;
      },
      (error) => {
        console.error("error %d", error);
      }
    )
  }
  /**
   * Save new Level
   */
  onSaveLevel() {
    let level: Level = {
      id: 0,
      name: this.levelForm.value.name
    }
    this.levelService.saveLevel$(level).subscribe(
      (response) => {
        this.notifierService.onSuccess(response.message);
        this.levelForm.reset();
      },
      (error) => {
        this.notifierService.onError("An error occured");
        console.error('error %d', error);
        this.levelForm.reset();
      }
    )
  }

  /**
   *  Save new Speciality
  */
  onSaveSpciality(): void {
    let speciality: Speciality = {
      id: 0,
      name: this.specialityForm.value.name
    }
    this.specialityService.saveSpeciality$(speciality).subscribe(
      (response) => {
        this.notifierService.onSuccess(response.message);
        this.specialityForm.reset();
        this.getSpeciality();
      },
      (error) => {
        this.notifierService.onError("An error occured");
        console.error('error %d', error);
        this.specialityForm.reset();
      }
    )
  }

  /**
  *  Save new OPtion
  */
  onSaveOption(): void {
    let option: Option = {
      id: 0,
      name: this.optionForm.value.name,
      fullName: this.optionForm.value.fullName,
      speciality: {
        id: this.optionForm.value.speciality.id as any,
        name: ''
      }
    }
    console.log(option);
    this.optionService.saveOption$(option).subscribe(
      (response) => {
        this.notifierService.onSuccess(response.message);
        this.optionForm.reset();
      },
      (error) => {
        this.notifierService.onError("An error occured");
        console.error('error %d', error);
      }
    )
  }

  /**
  *  Save new OPtion
  */
  onSaveCourse(): void {
    let course: Course = {
      id: 0,
      title: this.courseForm.value.title,
      credit: this.courseForm.value.credit as any
    }
    this.courseService.saveCourse$(course).subscribe(
      (response) => {
        this.notifierService.onSuccess(response.message);
        this.courseForm.reset();
      },
      (error) => {
        this.notifierService.onError("An error occured");
        console.error('error %d', error);
      }
    )
  }

  enableStting(): void {
    this.desable = !this.desable;
  }

  /**
   * Fetch option.
   */
  getOptions(): void {
    this.appState$ = this.optionService.options$.pipe(
      map(response => {
        this.dataSubject.next(response);
        this.optionSize = response.data.options.length;
        this.dataSource.data = response.data.options;
        this.notifierService.onDefault(response.message);
        return { dataState: DataState.LOADED_STATE, appData: response }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        this.notifierService.onError("Cannot fetch option")
        return of({ dataState: DataState.ERROR_STATE, error })
      })
    );
  }

  onDetelete(id: number): void {
    this.messageModaleService.confirmMessage("Do you want to delete ?");
    this.messageModaleService.checkDiscaseValueAfterCloseModale$().subscribe(
      {
        next: response => {
          if (response) {
            this.deleteOption(id);
            this.messageModaleService.updateValue();
          } else {
            console.log("no delete")
          }
        }
      }
    )
  }

  deleteOption(id: number) {
    this.optionService.deleteOption$(id).subscribe(
      {
        next: (response => {
          this.notifierService.onSuccess(response.message);
          this.appState$.subscribe();
        }),
        error: (error => {
          this.notifierService.onError("Cannot Delete");
        })
      }
    );
  }

}
