export const meetingTranscriptPrompt = (speakers) => {
  const speakerList = speakers
    .map((speaker) => `- ${speaker}`)
    .join('\n');

  return `Generate a transcript of the audio. Include timestamps and identify speakers.

Speakers are:
${speakerList}

eg:
[00:00] Brady: Hello there.
[00:02] Tim: Hi Brady.

It is important to include the correct speaker names. Use the names you identified earlier. If you really don't know the speaker's name, identify them with a letter of the alphabet, eg there may be an unknown speaker 'A' and another unknown speaker 'B'.

If there is music or a short jingle playing, signify like so:
[01:02] [MUSIC] or [01:02] [JINGLE]

If you can identify the name of the music or jingle playing then use that instead, eg:
[01:02] [Firework by Katy Perry] or [01:02] [The Sofa Shop jingle]

If there is some other sound playing try to identify the sound, eg:
[01:02] [Bell ringing]

Each individual caption should be quite short, a few short sentences at most.

Signify the end of the episode with [END].

Don't use any markdown formatting, like bolding or italics.

Only use characters from the English alphabet, unless you genuinely believe foreign characters are correct.

It is important that you use the correct words and spell everything correctly. Use the context of the podcast to help.
If the hosts discuss something like a movie, book or celebrity, make sure the movie, book, or celebrity name is spelled correctly.`;
};


export const meetingSummaryPrompt = `Generate a summary of the audio. Include timestamps and identify speakers.` ;


export const meetingActionItemsPrompt = `Generate a list of action items from the audio. Include timestamps and identify speakers.`


export const meetingKeyPointsPrompt = `Generate a list of key points from the audio.`

export const meetingTitlePrompt = `Generate a title for the audio. Only one title is required. `