export enum MoscowPriority {
  MUST_HAVE    = 'must_have',
  SHOULD_HAVE  = 'should_have',
  COULD_HAVE   = 'could_have',
  WONT_HAVE    = 'wont_have',
}
 
export enum ActorType {
  PRIMARY   = 'primary',
  SECONDARY = 'secondary',
}
 
export enum ElicitationStatus {
  PENDING     = 'pending',
  REVIEWED    = 'reviewed',
  IN_PROGRESS = 'in_progress',
  CLOSED      = 'closed',
}
 
// ── Sub-interfaces (agrupadas por paso del formulario) ───────────
 
export interface ElicitationContext {
  project_name:       string;
  stakeholder_name:   string;
  stakeholder_email?: string;
  elicitation_date:   string;   // 'YYYY-MM-DD'
}
 
export interface ElicitationStrategic {
  business_objective: string;
  problem_to_solve:   string;
  project_scope:      string;
  out_of_scope?:      string;
}
 
export interface ElicitationActor {
  actor_type:   ActorType | string;
  actor_name:   string;
  permissions?: string;
}
 
export interface ElicitationFunctional {
  user_story:      string;
  business_rules?: string;
  preconditions?:  string;
  postconditions?: string;
}
 
export interface ElicitationQuality {
  rnf_performance?: string;
  rnf_security?:    string;
  rnf_usability?:   string;
}
 
export interface ElicitationPriority {
  moscow_priority: MoscowPriority | string;
  dependencies?:   string;
}
 
// ── DTO de creación (lo que se envía al POST /elicitation) ───────
 
export interface CreateElicitationDto {
  context:    ElicitationContext;
  strategic:  ElicitationStrategic;
  actors:     ElicitationActor[];
  functional: ElicitationFunctional;
  quality:    ElicitationQuality;
  priority:   ElicitationPriority;
}
 
// ── Respuestas del API ───────────────────────────────────────────
 
export interface ApiResponse<T> {
  success: boolean;
  data?:   T;
  error?:  string;
  errors?: string[];
  message?: string;
}
 
export interface ElicitationCreatedResponse {
  id: number;
}
 
export interface ElicitationSummary {
  id:               number;
  project_name:     string;
  stakeholder_name: string;
  status:           ElicitationStatus;
  created_at:       string;
}
 
export interface ElicitationDetail extends ElicitationContext, ElicitationStrategic, ElicitationQuality {
  id:         number;
  status:     ElicitationStatus;
  created_at: string;
  updated_at: string;
  actors:     ElicitationActor[];
  functional: ElicitationFunctional;
  priority:   ElicitationPriority;
}