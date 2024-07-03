import { Conversation, ConversationFlavor } from '@grammyjs/conversations'
import { Context, SessionFlavor } from 'grammy'

export interface SessionData {
  preferences: string[]
}

export type PreferencesContext =
  & Context
  & SessionFlavor<SessionData>
  & ConversationFlavor

export type ConversationContext = Conversation<PreferencesContext>
