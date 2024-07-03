import { Context, SessionFlavor } from '@deps'

export interface SessionData {
  preferences: string[]
}

export type PreferencesContext =
  & Context
  & SessionFlavor<SessionData>
  & ConversationFlavor

export type ConversationContext = Conversation<PreferencesContext>
