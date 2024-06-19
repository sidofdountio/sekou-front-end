import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/model/course';
import { Level } from 'src/app/model/level';
import { Option } from 'src/app/model/option';
import { Speciality } from 'src/app/model/speciality';
import { CourseService } from 'src/app/service/course.service';
import { LevelService } from 'src/app/service/level.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OptionService } from 'src/app/service/option.service';
import { SpecialityService } from 'src/app/service/speciality.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  specialitys: Speciality[];

  specialityForm = this.fbuild.group({
    name: ['', [Validators.required]]

  });

  levelForm = this.fbuild.group({
    name: ['', [Validators.required]]
  });

  optionForm = this.fbuild.group({
    name: ['', [Validators.required]],
    speciality: this.fbuild.group({
      id: ['', [Validators.required]]
    })
  });

  courseForm = this.fbuild.group({
    title: ['', [Validators.required]],
    credit: ['', [Validators.required]]
  });

  constructor(private fbuild: FormBuilder, private levelService: LevelService, private serviceNotifier: NotificationService,
    private specialityService: SpecialityService, private optionService: OptionService, private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getSpeciality();

    this.levelService.levels$.subscribe(
      (response) => {
        this.serviceNotifier.onDefault(response.message);
      },
      (error) => {
        console.error("error %d", error);
      }
    );
  }
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
        this.serviceNotifier.onSuccess(response.message);
        this.specialityForm.reset();
      },
      (error) => {
        this.serviceNotifier.onError("An error occured");
        console.error('error %d', error);
        this.specialityForm.reset();
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
        this.serviceNotifier.onSuccess(response.message);
        this.specialityForm.reset();
        this.getSpeciality();
      },
      (error) => {
        this.serviceNotifier.onError("An error occured");
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
      speciality: {
        id: this.optionForm.value.speciality.id as any,
        name: ''
      }
    }
    console.log(option);
    this.optionService.saveOption$(option).subscribe(
      (response) => {
        this.serviceNotifier.onSuccess(response.message);
        this.optionForm.reset();
      },
      (error) => {
        this.serviceNotifier.onError("An error occured");
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
        this.serviceNotifier.onSuccess(response.message);
        this.courseForm.reset();
      },
      (error) => {
        this.serviceNotifier.onError("An error occured");
        console.error('error %d', error);
      }
    )
  }

}
