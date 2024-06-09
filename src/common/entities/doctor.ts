import { Column, Entity, OneToMany } from 'typeorm';

import { User } from './user';
import { Appointment } from './appointment';

// https://schema.org/MedicalSpecialty
export enum MedicalSpeciality {
  Anesthesia = 'Anesthesia',
  Cardiovascular = 'Cardiovascular',
  CommunityHealth = 'CommunityHealth',
  Dentistry = 'Dentistry',
  Dermatologic = 'Dermatologic',
  DietNutrition = 'DietNutrition',
  Emergency = 'Emergency',
  Endocrine = 'Endocrine',
  Gastroenterologic = 'Gastroenterologic',
  Genetic = 'Genetic',
  Geriatric = 'Geriatric',
  Gynecologic = 'Gynecologic',
  Hematologic = 'Hematologic',
  Infectious = 'Infectious',
  LaboratoryScience = 'LaboratoryScience',
  Midwifery = 'Midwifery',
  Musculoskeletal = 'Musculoskeletal',
  Neurologic = 'Neurologic',
  Nursing = 'Nursing',
  Obstetric = 'Obstetric',
  OccupationalTherapy = 'OccupationalTherapy',
  Oncologic = 'Oncologic',
  Optometic = 'Optometic',
  Otolaryngologic = 'Otolaryngologic',
  Pathology = 'Pathology',
  Pediatric = 'Pediatric',
  PharmacySpecialty = 'PharmacySpecialty',
  Physiotherapy = 'Physiotherapy',
  PlasticSurgery = 'PlasticSurgery',
  Podiatric = 'Podiatric',
  PrimaryCare = 'PrimaryCare',
  Psychiatric = 'Psychiatric',
  PublicHealth = 'PublicHealth',
  Pulmonary = 'Pulmonary',
  Radiograpy = 'Radiograpy',
  Renal = 'Renal',
  RespiratoryTherapy = 'RespiratoryTherapy',
  Rheumatologic = 'Rheumatologic',
  SpeechPathology = 'SpeechPathology',
  Surgical = 'Surgical',
  Toxicologic = 'Toxicologic',
  Urologic = 'Urologic',
}

@Entity()
export class Doctor extends User {
  @Column({
    type: 'enum',
    enum: MedicalSpeciality,
  })
  specialization: MedicalSpeciality;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];
}
