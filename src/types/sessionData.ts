import { Context, SessionFlavor } from 'grammy'

export interface SessionData {
  preferences: string[]
}

export type PreferencesContext = Context & SessionFlavor<SessionData>
