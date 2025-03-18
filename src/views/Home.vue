<template>
  <div class="home-page">
    <!-- Navigation Header -->
    <header class="main-header">
      <div class="container">
        <div class="logo">
          <h2>EarthChronicle</h2>
        </div>
        <nav class="main-nav">
          <a href="/" class="nav-link active">首页</a>
          <a href="/library" class="nav-link">百科</a>
          <a href="#" class="nav-link">发现</a>
          <a href="#" class="nav-link">助手</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1>Journey Through Earth's History</h1>
        <p class="hero-description">
          Explore the fascinating story of life on our planet, from the earliest microorganisms to today's complex ecosystems.
          Discover how Earth's biodiversity evolved and the environmental changes that shaped our world.
        </p>
        <div class="hero-buttons">
          <button class="primary-button" @click="scrollToTimeline">Explore Timeline</button>
          <button class="secondary-button">Learn About Conservation</button>
        </div>
      </div>
    </section>

    <!-- Timeline Introduction -->
    <section class="timeline-intro">
      <div class="container">
        <div class="section-header">
          <h2>The History of Life on Earth</h2>
          <p>Our interactive timeline spans 4.6 billion years of Earth's history, highlighting key evolutionary milestones and environmental events that shaped our planet's biodiversity.</p>
        </div>
        <div class="timeline-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div class="stat-number">4.6 Billion</div>
            <div class="stat-description">Years of Earth's History</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.4 5.4 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.4 5.4 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.4 5.4 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <div class="stat-number">8.7 Million</div>
            <div class="stat-description">Species on Earth Today</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c6.23-.05 11.25-7.27 9.61-13"></path>
                <path d="M8.5 17c1.5 1 3.5 1 5-1"></path>
                <path d="M15 8.5c1.5-1 3-1 4.5.5"></path>
                <path d="M13 2c-2.25-.5-5.25.5-9 5"></path>
                <path d="M13 2c1.38 2.5 2 5 1 8"></path>
                <path d="M13 10c-1.66.5-3.5.5-5.5-1"></path>
                <path d="M4 10c-.5 1.5-.5 3 .5 4.5"></path>
              </svg>
            </div>
            <div class="stat-number">5</div>
            <div class="stat-description">Mass Extinction Events</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21h18"></path>
                <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                <path d="M19 7V5a2 2 0 0 0-2-2h-2"></path>
                <path d="M13 3h-2"></path>
                <path d="M13 21v-9a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v9"></path>
                <path d="M21 21v-14a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v14"></path>
              </svg>
            </div>
            <div class="stat-number">4</div>
            <div class="stat-description">Major Geological Eras</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Timeline -->
    <section id="timeline-section" class="timeline-section">
      <div class="container">
        <div class="timeline-controls">
          <button 
            v-for="era in eras" 
            :key="era.id" 
            @click="selectEra(era.id)"
            :class="['era-button', selectedEra === era.id ? 'active' : '']"
          >
            {{ era.name }}
          </button>
        </div>
        
        <div class="timeline-container">
          <div class="timeline-scale">
            <div class="scale-marker" v-for="marker in timelineMarkers" :key="marker.year">
              <div class="marker-line"></div>
              <div class="marker-label">{{ marker.label }}</div>
            </div>
          </div>
          
          <div class="timeline-visual">
            <div 
              v-for="era in eras" 
              :key="era.id"
              :class="['era-block', selectedEra === era.id ? 'active' : '']"
              :style="{ width: calculateEraWidth(era), backgroundColor: era.color }"
              @click="selectEra(era.id)"
            >
              <div class="era-name">{{ era.name }}</div>
            </div>
          </div>
          
          <!-- Era Details with Transition -->
          <Transition name="scale" mode="out-in">
            <div class="era-details" v-if="currentEra" key="era-details">
              <div class="era-header">
                <h3>{{ currentEra.name }} <span class="era-period">{{ currentEra.period }}</span></h3>
                <p class="era-description">{{ currentEra.description }}</p>
              </div>
              
              <div class="era-content">
                <div class="era-species">
                  <h4>Notable Species</h4>
                  <TransitionGroup name="scale" tag="div" class="species-grid">
                    <div class="species-card" v-for="species in currentEra.species" :key="species.id">
                      <div class="species-image">
                        <img :src="species.image" :alt="species.name">
                      </div>
                      <div class="species-info">
                        <h5>{{ species.name }}</h5>
                        <p class="species-scientific-name">{{ species.scientificName }}</p>
                        <p class="species-description">{{ species.description }}</p>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
                
                <div class="era-events">
                  <h4>Key Environmental Events</h4>
                  <TransitionGroup name="scale" tag="div" class="events-timeline">
                    <div class="event-item" v-for="event in currentEra.events" :key="event.id">
                      <div class="event-time">{{ event.time }}</div>
                      <div class="event-content">
                        <h5>{{ event.title }}</h5>
                        <p>{{ event.description }}</p>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Biodiversity Importance -->
    <section class="biodiversity-section">
      <div class="container">
        <div class="section-header">
          <h2>Why Biodiversity Matters</h2>
          <p>Understanding Earth's biological history helps us appreciate the importance of preserving biodiversity today.</p>
        </div>
        
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3>Ecosystem Stability</h3>
            <p>Diverse ecosystems are more resilient to environmental changes and can better recover from disturbances.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <h3>Human Health</h3>
            <p>Biodiversity provides essential resources for medicine, nutrition, and clean air and water.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>Climate Regulation</h3>
            <p>Diverse ecosystems help regulate climate by storing carbon and mitigating extreme weather events.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3>Scientific Knowledge</h3>
            <p>Studying biodiversity provides insights into evolution, adaptation, and the development of new technologies.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Conservation Call to Action -->
    <section class="conservation-cta">
      <div class="container">
        <div class="cta-content">
          <h2>Join Our Conservation Efforts</h2>
          <p>Help protect Earth's biodiversity for future generations. Learn about conservation initiatives and how you can contribute.</p>
          <button class="primary-button">Get Involved</button>
        </div>
        <div class="cta-image">
          <img src="../assets/2.svg" alt="Conservation efforts">
        </div>
      </div>
    </section>

    <!-- Educational Resources -->
    <section class="resources-section">
      <div class="container">
        <div class="section-header">
          <h2>Educational Resources</h2>
          <p>Explore our collection of articles, videos, and interactive materials about Earth's biological history and conservation.</p>
        </div>
        
        <div class="resources-grid">
          <div class="resource-card">
            <div class="resource-image">
              <img src="../assets/2.svg" alt="Article">
              <div class="resource-type">Article</div>
            </div>
            <div class="resource-content">
              <h3>The Big Five Mass Extinctions</h3>
              <p>Learn about the five major extinction events that dramatically altered life on Earth.</p>
              <a href="#" class="resource-link">Read More →</a>
            </div>
          </div>
          <div class="resource-card">
            <div class="resource-image">
              <img src="../assets/2.svg" alt="Video">
              <div class="resource-type">Video</div>
            </div>
            <div class="resource-content">
              <h3>Evolution of Mammals</h3>
              <p>Watch how mammals evolved from small nocturnal creatures to diverse species across the globe.</p>
              <a href="#" class="resource-link">Watch Now →</a>
            </div>
          </div>
          <div class="resource-card">
            <div class="resource-image">
              <img src="../assets/2.svg" alt="Interactive">
              <div class="resource-type">Interactive</div>
            </div>
            <div class="resource-content">
              <h3>Climate Change Simulator</h3>
              <p>Explore how different factors affect Earth's climate and biodiversity over time.</p>
              <a href="#" class="resource-link">Try It →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-container">
          <div class="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest research, conservation news, and educational resources.</p>
          </div>
          <div class="newsletter-form">
            <input type="email" placeholder="Your email address" v-model="emailInput">
            <button @click="subscribeNewsletter" class="subscribe-button">Subscribe</button>
          </div>
          <p class="privacy-note">We respect your privacy and will never share your information.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="main-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>EarthChronicle</h3>
            <p>Exploring Earth's biological history and promoting conservation</p>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497 -3.753C20.18 7.773 21.692 5.25 22 4.009z"></path>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" class="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-section">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Timeline</a></li>
              <li><a href="#">Species Database</a></li>
              <li><a href="#">Geological Eras</a></li>
              <li><a href="#">Conservation</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Articles</a></li>
              <li><a href="#">Videos</a></li>
              <li><a href="#">Interactive Tools</a></li>
              <li><a href="#">Educational Materials</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Volunteer</a></li>
              <li><a href="#">Donate</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© {{ new Date().getFullYear() }} EarthChronicle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const emailInput = ref('')
const selectedEra = ref('cenozoic')
const timelineMarkers = ref([
  { year: 4600, label: '4.6 Billion Years Ago' },
  { year: 3500, label: '3.5 Billion Years Ago' },
  { year: 2500, label: '2.5 Billion Years Ago' },
  { year: 541, label: '541 Million Years Ago' },
  { year: 252, label: '252 Million Years Ago' },
  { year: 66, label: '66 Million Years Ago' },
  { year: 0, label: 'Present' }
])

// Eras data
const eras = ref([
  {
    id: 'precambrian',
    name: 'Precambrian',
    period: '4.6 billion - 541 million years ago',
    color: '#8C6BB1',
    startYear: 4600,
    endYear: 541,
    description: 'The Precambrian covers approximately 88% of Earth\'s history. It saw the formation of Earth, the emergence of continents, oceans, atmosphere, and the first life forms - simple, single-celled organisms that later evolved into more complex forms.',
    species: [
      {
        id: 'stromatolites',
        name: 'Stromatolites',
        scientificName: 'Various cyanobacteria',
        image: '../assets/2.svg?height=200&width=200',
        description: 'Layered structures formed by colonies of photosynthetic cyanobacteria. They are among the oldest evidence of life on Earth, dating back over 3.5 billion years.'
      },
      {
        id: 'ediacaran',
        name: 'Ediacaran Biota',
        scientificName: 'Various soft-bodied organisms',
        image: '../assets/2.svg?height=200&width=200',
        description: 'Mysterious soft-bodied organisms that appeared about 575 million years ago. They represent the first complex multicellular organisms in Earth\'s history.'
      },
      {
        id: 'cloudina',
        name: 'Cloudina',
        scientificName: 'Cloudina hartmannae',
        image: '../assets/2.svg?height=200&width=200',
        description: 'One of the first animals to produce a mineralized skeleton, appearing around 550 million years ago. These small, tube-shaped fossils mark an important evolutionary milestone.'
      }
    ],
    events: [
      {
        id: 'earth-formation',
        time: '4.6 billion years ago',
        title: 'Formation of Earth',
        description: 'Earth formed from the solar nebula, a disk of gas and dust left over from the formation of the Sun.'
      },
      {
        id: 'first-oceans',
        time: '4.4 billion years ago',
        title: 'First Oceans Form',
        description: 'As Earth cooled, water vapor condensed to form the first oceans, creating environments where life could eventually emerge.'
      },
      {
        id: 'first-life',
        time: '~3.5 billion years ago',
        title: 'First Life Appears',
        description: 'Simple, single-celled prokaryotic organisms emerged, likely near hydrothermal vents in the ocean.'
      },
      {
        id: 'oxygen-revolution',
        time: '2.4-2.0 billion years ago',
        title: 'Great Oxygenation Event',
        description: 'Photosynthetic cyanobacteria produced oxygen as a waste product, gradually changing Earth\'s atmosphere and making it possible for aerobic life to evolve.'
      },
      {
        id: 'multicellular',
        time: '~1.5 billion years ago',
        title: 'First Multicellular Organisms',
        description: 'Cells began to cooperate and specialize, leading to the first simple multicellular organisms.'
      }
    ]
  },
  {
    id: 'paleozoic',
    name: 'Paleozoic',
    period: '541-252 million years ago',
    color: '#41AB5D',
    startYear: 541,
    endYear: 252,
    description: 'The Paleozoic Era saw an explosion of life forms, including the first fish, land plants, insects, and reptiles. It began with the Cambrian Explosion, a rapid diversification of complex life, and ended with the largest mass extinction in Earth\'s history.',
    species: [
      {
        id: 'trilobite',
        name: 'Trilobite',
        scientificName: 'Phylum Trilobita',
        image: '../assets/2.svg?height=200&width=200',
        description: 'Marine arthropods that dominated the early Paleozoic seas. They were among the most successful and diverse groups of their time, with over 20,000 known species.'
      },
      {
        id: 'dunkleosteus',
        name: 'Dunkleosteus',
        scientificName: 'Dunkleosteus terrelli',
        image: '../assets/2.svg?height=200&width=200',
        description: 'A massive armored fish from the late Devonian period, growing up to 6 meters long. It was one of the first vertebrate apex predators.'
      },
      {
        id: 'meganeura',
        name: 'Meganeura',
        scientificName: 'Meganeura monyi',
        image: '../assets/2.svg?height=200&width=200',
        description: 'A giant dragonfly-like insect with a wingspan of up to 65 cm. It lived during the Carboniferous period when oxygen levels were much higher than today.'
      },
      {
        id: 'dimetrodon',
        name: 'Dimetrodon',
        scientificName: 'Dimetrodon limbatus',
        image: '../assets/2.svg?height=200&width=200',
        description: 'Often mistaken for a dinosaur, this sail-backed reptile-like animal was actually more closely related to mammals. It lived during the Permian period.'
      }
    ],
    events: [
      {
        id: 'cambrian-explosion',
        time: '541-530 million years ago',
        title: 'Cambrian Explosion',
        description: 'A relatively short period when most major animal phyla appeared in the fossil record. Complex life diversified rapidly during this time.'
      },
      {
        id: 'land-plants',
        time: '~470 million years ago',
        title: 'First Land Plants',
        description: 'Simple plants like mosses and liverworts began to colonize the land, eventually leading to the development of forests.'
      },
      {
        id: 'vertebrates-land',
        time: '~375 million years ago',
        title: 'Vertebrates Move to Land',
        description: 'Fish evolved into tetrapods, four-limbed vertebrates that could venture onto land, leading to amphibians and eventually reptiles.'
      },
      {
        id: 'coal-forests',
        time: '360-300 million years ago',
        title: 'Carboniferous Coal Forests',
        description: 'Vast swamp forests covered much of the tropical land, eventually forming coal deposits. Oxygen levels reached their highest in Earth\'s history.'
      },
      {
        id: 'permian-extinction',
        time: '252 million years ago',
        title: 'Permian-Triassic Extinction',
        description: 'The largest mass extinction in Earth\'s history, wiping out about 96% of marine species and 70% of terrestrial vertebrate species. Possibly caused by massive volcanic eruptions in Siberia.'
      }
    ]
  },
  {
    id: 'mesozoic',
    name: 'Mesozoic',
    period: '252-66 million years ago',
    color: '#E6550D',
    startYear: 252,
    endYear: 66,
    description: 'Often called the "Age of Dinosaurs," the Mesozoic Era saw the rise and fall of these iconic reptiles. It also witnessed the appearance of the first mammals, birds, and flowering plants, as well as the breakup of the supercontinent Pangaea.',
    species: [
      {
        id: 'tyrannosaurus',
        name: 'Tyrannosaurus Rex',
        scientificName: 'Tyrannosaurus rex',
        image: '../assets/2.svg?height=200&width=200',
        description: 'One of the largest carnivorous dinosaurs, living at the end of the Cretaceous period. This apex predator could grow up to 12 meters long and had powerful jaws with bone-crushing teeth.'
      },
      {
        id: 'stegosaurus',
        name: 'Stegosaurus',
        scientificName: 'Stegosaurus stenops',
        image: '../assets/2.svg?height=200&width=200',
        description: 'A large herbivorous dinosaur from the late Jurassic period, characterized by its distinctive plates along its back and spiked tail used for defense.'
      },
      {
        id: 'archaeopteryx',
        name: 'Archaeopteryx',
        scientificName: 'Archaeopteryx lithographica',
        image: '../assets/2.svg?height=200&width=200',
        description: 'A transitional species between dinosaurs and birds, showing features of both groups. It lived during the late Jurassic period and provides important evidence for evolution.'
      },
      {
        id: 'ichthyosaur',
        name: 'Ichthyosaur',
        scientificName: 'Order Ichthyosauria',
        image: '../assets/2.svg?height=200&width=200',
        description: 'Marine reptiles that evolved a fish-like body shape through convergent evolution. They were highly adapted to aquatic life and some species gave birth to live young in water.'
      }
    ],
    events: [
      {
        id: 'pangaea-breakup',
        time: '200-145 million years ago',
        title: 'Breakup of Pangaea',
        description: 'The supercontinent Pangaea began to fragment, eventually forming the continents we know today. This created new habitats and influenced evolution.'
      },
      {
        id: 'first-mammals',
        time: '~225 million years ago',
        title: 'First Mammals Appear',
        description: 'Small, nocturnal creatures evolved from reptile ancestors. They would remain relatively inconspicuous until after the dinosaurs\' extinction.'
      },
      {
        id: 'first-birds',
        time: '~150 million years ago',
        title: 'First Birds Evolve',
        description: 'Birds evolved from small theropod dinosaurs, with Archaeopteryx representing an early transitional form.'
      },
      {
        id: 'flowering-plants',
        time: '~130 million years ago',
        title: 'Flowering Plants Emerge',
        description: 'Angiosperms (flowering plants) appeared and rapidly diversified, eventually becoming the dominant plant group and forming a co-evolutionary relationship with many animal pollinators.'
      },
      {
        id: 'kt-extinction',
        time: '66 million years ago',
        title: 'Cretaceous-Paleogene Extinction',
        description: 'An asteroid impact in the Yucatan Peninsula caused a mass extinction that wiped out all non-avian dinosaurs and many other species, opening ecological niches for mammals to diversify.'
      }
    ]
  },
  {
    id: 'cenozoic',
    name: 'Cenozoic',
    period: '66 million years ago - present',
    color: '#3182BD',
    startYear: 66,
    endYear: 0,
    description: 'The "Age of Mammals," the Cenozoic Era is characterized by the diversification of mammals, birds, and flowering plants following the extinction of the dinosaurs. It saw the evolution of primates, including humans, and dramatic climate changes including multiple ice ages.',
    species: [
      {
        id: 'mammoth',
        name: 'Woolly Mammoth',
        scientificName: 'Mammuthus primigenius',
        image: '../assets/2.svg?height=200&width=200',
        description: 'Ice Age mammals related to modern elephants, adapted to cold environments with long fur and curved tusks. They went extinct only about 4,000 years ago.'
      },
      {
        id: 'megalodon',
        name: 'Megalodon',
        scientificName: 'Otodus megalodon',
        image: '../assets/2.svg?height=200&width=200',
        description: 'The largest shark that ever lived, reaching lengths of up to 18 meters. This apex predator dominated the oceans from 23 to 3.6 million years ago.'
      },
      {
        id: 'smilodon',
        name: 'Saber-toothed Cat',
        scientificName: 'Smilodon fatalis',
        image: '../assets/2.svg?height=200&width=200',
        description: 'An iconic Ice Age predator with elongated canine teeth. It hunted large herbivores in the Americas until its extinction about 10,000 years ago.'
      },
      {
        id: 'homo',
        name: 'Early Humans',
        scientificName: 'Homo species',
        image: '../assets/2.svg?height=200&width=200',
        description: 'Various human species evolved in Africa and spread across the globe. Homo sapiens emerged around 300,000 years ago and eventually became the only surviving human species.'
      }
    ],
    events: [
      {
        id: 'mammal-radiation',
        time: '66-56 million years ago',
        title: 'Mammalian Adaptive Radiation',
        description: 'With dinosaurs extinct, mammals rapidly diversified to fill vacant ecological niches, evolving into many new forms and sizes.'
      },
      {
        id: 'himalaya-formation',
        time: '50-40 million years ago',
        title: 'Formation of the Himalayas',
        description: 'The collision of the Indian and Eurasian plates began forming the Himalayan mountain range, affecting global climate patterns.'
      },
      {
        id: 'antarctica-ice',
        time: '~34 million years ago',
        title: 'Antarctic Ice Sheet Forms',
        description: 'Antarctica became covered by an ice sheet as global temperatures cooled, marking a major shift toward our modern climate.'
      },
      {
        id: 'grasslands-spread',
        time: '~25 million years ago',
        title: 'Spread of Grasslands',
        description: 'Grasslands expanded globally, leading to the evolution of grazing animals and new ecosystems.'
      },
      {
        id: 'ice-ages',
        time: '2.6 million - 11,700 years ago',
        title: 'Pleistocene Ice Ages',
        description: 'A series of glacial periods when ice sheets repeatedly advanced and retreated across North America and Eurasia, driving migrations and extinctions.'
      },
      {
        id: 'human-agriculture',
        time: '~12,000 years ago',
        title: 'Development of Agriculture',
        description: 'Humans began domesticating plants and animals, leading to settled civilizations and eventually transforming much of Earth\'s surface.'
      },
      {
        id: 'anthropocene',
        time: 'Present',
        title: 'The Anthropocene',
        description: 'The current geological age, informally defined as the period during which human activity has significantly impacted Earth\'s geology and ecosystems.'
      }
    ]
  }
])

// Computed properties
const currentEra = computed(() => {
  return eras.value.find(era => era.id === selectedEra.value)
})

// Methods
const calculateEraWidth = (era) => {
  const totalYears = 4600
  const eraSpan = era.startYear - era.endYear
  const percentage = (eraSpan / totalYears) * 100
  return `${percentage}%`
}

const selectEra = (eraId) => {
  selectedEra.value = eraId
}

const scrollToTimeline = () => {
  document.getElementById('timeline-section').scrollIntoView({ behavior: 'smooth' })
}

const subscribeNewsletter = () => {
  if (emailInput.value && emailInput.value.includes('@')) {
    alert(`Thank you for subscribing with ${emailInput.value}!`)
    emailInput.value = ''
  } else {
    alert('Please enter a valid email address')
  }
}
</script>

<style>
/* Base Styles */
:root {
  --primary-color: #2e7d32;
  --primary-light: #60ad5e;
  --primary-dark: #005005;
  --secondary-color: #1565c0;
  --text-primary: #212121;
  --text-secondary: #757575;
  --background-light: #f5f5f5;
  --background-white: #ffffff;
  --accent-color: #ffc107;
  
  /* Era colors */
  --precambrian-color: #8C6BB1;
  --paleozoic-color: #41AB5D;
  --mesozoic-color: #E6550D;
  --cenozoic-color: #3182BD;
  
  --border-radius: 8px;
  --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--background-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

h1, h2, h3, h4, h5 {
  font-weight: 600;
  line-height: 1.3;
  color: var(--primary-dark);
}

a {
  color: var(--secondary-color);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  text-decoration: underline;
}

button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  transition: var(--transition);
}

/* Header Styles */
.main-header {
  background-color: var(--background-white);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.main-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  color: var(--primary-color);
  font-size: 1.5rem;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link:hover, .nav-link.active {
  color: var(--primary-color);
  text-decoration: none;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: white;
}

.hero-description {
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.primary-button {
  background-color: var(--accent-color);
  color: var(--text-primary);
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
}

.primary-button:hover {
  background-color: #ffb300;
  transform: translateY(-2px);
}

.secondary-button {
  background-color: transparent;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  border: 2px solid white;
}

.secondary-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-header p {
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* Timeline Intro */
.timeline-intro {
  padding: 5rem 0 3rem;
  background-color: var(--background-white);
}

.timeline-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  background-color: var(--background-light);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.stat-icon {
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--primary-dark);
}

.stat-description {
  color: var(--text-secondary);
}

/* Timeline Section */
.timeline-section {
  padding: 3rem 0 5rem;
  background-color: var(--background-light);
}

.timeline-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.era-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  font-weight: 500;
  color: var(--text-primary);
  transition: var(--transition);
}

.era-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow);
}

.era-button.active {
  background-color: var(--primary-color);
  color: white;
}

.timeline-container {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
}

.timeline-scale {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
}

.scale-marker {
  text-align: center;
  position: relative;
  flex: 1;
}

.marker-line {
  height: 12px;
  width: 2px;
  background-color: var(--text-secondary);
  margin: 0 auto 0.5rem;
}

.marker-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  transform: rotate(-45deg);
  transform-origin: top left;
  position: absolute;
  white-space: nowrap;
}

.timeline-visual {
  display: flex;
  height: 60px;
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.era-block {
  height: 100%;
  position: relative;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.era-block:hover {
  transform: translateY(-3px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.era-block.active {
  height: 70px;
  margin-top: -5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 20;
}

.era-name {
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
}

/* Animation Definitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

.scale-move {
  transition: transform 0.5s ease;
}

/* 确保文本缩放时保持可读性 */
.event-item, .species-card {
  transform-origin: center;
}

/* Era Details (保持原有样式，调整为支持动画) */
.era-details {
  margin-top: 2rem;
}

.era-header {
  margin-bottom: 2rem;
}

.era-header h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-dark);
}

.era-period {
  font-size: 1.2rem;
  font-weight: normal;
  color: var(--text-secondary);
  margin-left: 1rem;
}

.era-description {
  color: var(--text-primary);
  font-size: 1.1rem;
  line-height: 1.7;
}

.era-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .era-content {
    grid-template-columns: 1fr 1fr;
  }
}

.era-species h4,
.era-events h4 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-dark);
}

.species-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.species-card {
  display: flex;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
}

.species-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow);
}

.species-image {
  width: 100px;
  min-width: 100px;
  height: 100px;
}

.species-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.species-info {
  padding: 1rem;
}

.species-info h5 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.species-scientific-name {
  font-style: italic;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.species-description {
  font-size: 0.9rem;
  color: var(--text-primary);
}

.events-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-item {
  display: flex;
  gap: 1.5rem;
}

.event-time {
  min-width: 120px;
  font-weight: 600;
  color: var(--primary-color);
}

.event-content h5 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.event-content p {
  font-size: 0.9rem;
  color: var(--text-primary);
}

/* Biodiversity Section */
.biodiversity-section {
  padding: 5rem 0;
  background-color: var(--background-white);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.benefit-card {
  padding: 2rem;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.benefit-icon {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.benefit-card h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.benefit-card p {
  color: var(--text-secondary);
}

/* Conservation CTA */
.conservation-cta {
  padding: 5rem 0;
  background-color: var(--background-light);
}

.conservation-cta .container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 768px) {
  .conservation-cta .container {
    grid-template-columns: 1fr 1fr;
  }
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta-content p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.cta-image img {
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
}

/* Resources Section */
.resources-section {
  padding: 5rem 0;
  background-color: var(--background-white);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.resource-card {
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--box-shadow);
}

.resource-image {
  position: relative;
  height: 180px;
}

.resource-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resource-type {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

.resource-content {
  padding: 1.5rem;
}

.resource-content h3 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.resource-content p {
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
}

.resource-link {
  color: var(--primary-color);
  font-weight: 500;
}

.resource-link:hover {
  text-decoration: underline;
}

/* Newsletter Section */
.newsletter-section {
  padding: 5rem 0;
}

.newsletter-container {
  background-color: var(--primary-color);
  padding: 3rem;
  border-radius: var(--border-radius);
  color: white;
  text-align: center;
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.newsletter-content h2 {
  color: white;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto 1rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
}

.subscribe-button {
  background-color: var(--accent-color);
  color: var(--text-primary);
  padding: 0 1.5rem;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  font-weight: 500;
}

.subscribe-button:hover {
  background-color: #ffb300;
}

.privacy-note {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Footer */
.main-footer {
  background-color: #1b5e20;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: white;
}

.footer-section p {
  opacity: 0.8;
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  transition: var(--transition);
}

.social-icon:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
  text-decoration: none;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: white;
  opacity: 0.8;
  transition: var(--transition);
}

.footer-section ul li a:hover {
  opacity: 1;
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  opacity: 0.7;
  font-size: 0.9rem;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .era-header h3 {
    font-size: 1.75rem;
  }
  
  .era-period {
    display: block;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 0;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .timeline-scale .marker-label {
    font-size: 0.7rem;
  }
  
  .era-name {
    font-size: 0.8rem;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-form input {
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }
  
  .subscribe-button {
    border-radius: var(--border-radius);
    padding: 0.75rem 0;
  }
}

@media (max-width: 480px) {
  .main-header .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .main-nav {
    width: 100%;
    justify-content: space-between;
  }
  
  .section-header h2 {
    font-size: 1.75rem;
  }
  
  .timeline-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .timeline-scale {
    display: none;
  }
  
  .era-block .era-name {
    display: none;
  }
  
  .event-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .event-time {
    min-width: auto;
  }
  
  .species-card {
    flex-direction: column;
  }
  
  .species-image {
    width: 100%;
    height: 150px;
  }
  
  .newsletter-container {
    padding: 2rem 1rem;
  }
}
</style>