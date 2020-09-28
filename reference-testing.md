Testing and Management tools:

Discord API Updates-
  from discord_webhook import DiscordWebhook, DiscordEmbed
  bot = "https://discordapp.com/api/webhooks/760069326836334633/p1nP5FmZfP-xH3-z9fvV-osiU05UgnaYDrqm-Hu5ILrU0wB_4iQTLXq8Xfc8auVjWHCh"

  def main():
      #webhook = DiscordWebhook(url=bot)
      #embed = DiscordEmbed(title='https://github.com/atab7/SES_1B_Group2.git', description='Repository for UTS Spring Session 2020 Software Engineering Studio 1B Project of Group 2', color=111111)
      #webhook.add_embed(embed)
      webhook = DiscordWebhook(url=bot, content='Example Message')
      response = webhook.execute()

  main()

Zenhub - https://app.zenhub.com/workspaces/ses-1b-group-2-project-5f4cdd739773830012d350d3/board?repos=282794862

Github/Issues - Tasks updates, allocation, acceptance criteria and completion
