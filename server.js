const express=require("express");
const app=express();
const path=require("path");

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{res.redirect("/XCalendar")});

app.get("/XCalendar",(req,res)=>res.sendFile(path.join(__dirname,"views","index.html")));


const bhagavadGitaVerses = [
    {
      id: 1,
      text: "Your thoughts are arrows, Arjuna. Aim them towards the divine, and pierce the veil of illusion.",
    },
    {
      id: 2,
      text: "Doubts are clouds obscuring the sun of your inner wisdom. Seek clarity through focused meditation.",
    },
    {
      id: 3,
      text: "Action without attachment is the dance of the soul, a graceful offering to the cosmic stage.",
    },
    {
      id: 4,
      text: "The fire of desire may consume you, or refine your spirit. Choose the fuel wisely, Arjuna.",
    },
    {
      id: 5,
      text: "The world is a reflection of your inner landscape. Cultivate serenity within, and witness harmony bloom without.",
    },
    {
      id: 6,
      text: "The past is a chariot driver, guiding you to the present. Let go of the reins, and live fully in the now.",
    },
    {
      id: 7,
      text: "The future is a canvas, waiting for your brushstrokes. Paint it with faith, and step into the masterpiece.",
    },
    {
      id: 8,
      text: "Karma is the echo of your choices. Make conscious decisions, and hear the sweet melody of liberation.",
    },
    {
      id: 9,
      text: "Your true essence is untouched by joy or sorrow, victory or defeat. Abide in that eternal Self, Arjuna.",
    },
    {
      id: 10,
      text: "The wise see no difference between a pebble and a mountain, a blade of grass and the vast sky. All is Brahman.",
    },
    {
      id: 11,
      text: "The senses are your gateway to the world, but they can also be your prison. Learn to control them, not be controlled by them.",
    },
    {
      id: 12,
      text: "Knowledge without action is a barren field. Wisdom is the seed, and devotion is the rain that brings forth a harvest of liberation.",
    },
    {
      id: 13,
      text: "The guru is a mirror, reflecting your true potential. Look into their eyes, and see the divine within yourself.",
    },
    {
      id: 14,
      text: "Attachment is the spider's web, binding you to the world. Spin the thread of detachment, and soar free on the wings of liberation.",
    },
    {
      id: 15,
      text: "The ego is a mask, hiding your true Self. Shatter it with the sword of self-knowledge, and reveal the radiant being within.",
    },
    {
      id: 16,
      text: "Life is a stage, and you are the playwright, director, and actor. Write a story of courage and compassion, and watch it unfold.",
    },
    {
      id: 17,
      text: "Death is not an ending, but a doorway. Step through it with equanimity, and embrace the eternal dance of existence.",
    },
    {
      id: 18,
      text: "Fear is a shadow cast by your own mind. Shine the light of courage upon it, and watch it dissolve into nothingness.",
    },
    {
      id: 19,
      text: "Your breath is the bridge between your finite self and the infinite divine. Breathe deeply, and feel the oneness of all that is.",
    },
    {
      id: 20,
      text: "The universe whispers your name, Arjuna. Listen closely, and discover the symphony of your soul.",
    },
    {
      id: 21,
      text: "Striving for results binds you, Arjuna. Surrender to the process, and find freedom in the dance of action.",
    },
    {
      id: 22,
      text: "The mind is a restless monkey, Arjuna. Tame it with the practice of yoga, and find stillness within the storm.",
    },
    {
      id: 23,
      text: "Like a lotus flower blooming in muddy water, rise above your circumstances, Arjuna, and radiate the light of your spirit.",
    },
    {
      id: 24,
      text: "True strength lies not in muscles, Arjuna, but in the unflinching resolve of a heart anchored in Dharma.",
    },
    {
      id: 25,
      text: "Service is the highest form of yoga, Arjuna. Offer your skills and talents with a selfless heart, and find fulfillment in the well-being of others.",
    },
    {
      id: 26,
      text: "Karmaphala, the fruit of your actions, is not yours to control. Let go of attachment to outcomes, and focus on the purity of your actions.",
    },
    {
      id: 27,
      text: "The world is a teacher, Arjuna. Learn from every experience, big or small, and see the divine wisdom in every twist and turn.",
    },
    {
      id: 28,
      text: "Just as the moon reflects the sun's light, your soul reflects the divine light within. Seek that inner luminosity, Arjuna.",
    },
    {
      id: 29,
      text: "The path of liberation is not paved with gold, Arjuna, but with thorns of self-discipline. Embrace the challenges, and emerge stronger.",
    },
    {
      id: 30,
      text: "Discrimination is the sword of wisdom, Arjuna. Use it to discern the real from the unreal, the eternal from the fleeting.",
    },
    {
      id: 31,
      text: "Silence is the language of the soul, Arjuna. In the quietude of your being, hear the whispers of the divine.",
    },
    {
      id: 32,
      text: "Gratitude is the fragrance of a humble heart, Arjuna. Let it fill your every breath, and watch your world blossom.",
    },
    {
      id: 33,
      text: "Compassion is the bridge that connects you to all beings, Arjuna. Cross over with an open heart, and feel the oneness of existence.",
    },
    {
      id: 34,
      text: "Forgive yourself, Arjuna, as you would forgive a friend. Let go of the burden of the past, and walk into the present with lightness.",
    },
    {
      id: 35,
      text: "Every step on the path of yoga is a victory, Arjuna. Celebrate the journey, not just the destination.",
    },
    {
      id: 36,
      text: "Doubt not your strength, Arjuna, for it is born of the divine within. Rise up, warrior, and fulfill your dharma.",
    },
    {
      id: 37,
      text: "The world is an illusion, a maya, Arjuna. See through its veil, and discover the unchanging reality that lies beneath.",
    },
    {
      id: 38,
      text: "Time is a river, Arjuna, flowing ever onward. Don't get swept away by its current. Anchor yourself in the present moment.",
    },
    {
      id: 39,
      text: "Guru Kripa, the grace of the teacher, is the wind that fills your sails, Arjuna. Trust its guidance, and navigate the ocean of life with ease.",
    },
    {
      id: 40,
      text: "Let go of comparisons, Arjuna. You are unique, a masterpiece in the making. Embrace your individuality and shine your light.",
    },
    {
      "id": 41,
      "text": "Let the world's whispers be mere dust on your soul, Arjuna. Seek your value in the mirror of your own self-worth."
    },
    {
      "id": 42,
      "text": "Desire, like a wild river, can drown your spirit, Arjuna. Channel its currents wisely, to fuel your journey towards inner peace."
    },
    {
      "id": 43,
      "text": "The past is a story you write, Arjuna. Choose forgiveness as your pen, and rewrite it into a present filled with compassion."
    },
    {
      "id": 44,
      "text": "The future is an open canvas, Arjuna. Paint it with your intentions, and let your actions be the brushstrokes that shape your masterpiece."
    },
    {
      "id": 45,
      "text": "Silence the inner critic, Arjuna. Listen instead to the whispers of your soul, for they guide you towards your highest potential."
    },
    {
      "id": 46,
      "text": "Nature is a mirror to your own inner landscape, Arjuna. Find stillness in the mountains, wisdom in the rivers, and harmony in the dance of all living things."
    },
  ];
  
app.get("/randomVerse",(req,res)=>{ 
    const randomVerse=getRandomVerse();
    res.json(randomVerse);
}) ; 

function getRandomVerse()
{ let randomIdx=Math.floor(Math.random()*bhagavadGitaVerses.length);
   return bhagavadGitaVerses[randomIdx];
}

app.listen("8080",(req,res)=>{console.log("App is listening at port 8080")});