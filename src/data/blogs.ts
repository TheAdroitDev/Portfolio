export interface Blog {
  title: string;
  slug: string;
  description: string;
  subtitle: string;
  date: string;
  url: string;
  readTime: string;
  thumbnail: string;
  content: string;
}

export const blogs: Blog[] = [
  {
    title: "How to Make Your Portfolio a Success",
    slug: "how-to-make-your-portfolio-a-success",
    subtitle: "Why your portfolio website isn't getting visitors or hiring managers",
    description: "Why your portfolio website is not getting visitors and hiring managers, and how to transform it into a value-driven asset.",
    date: "2026-08-03",
    url: "https://hashnode.com/@theadroitdev",
    readTime: "5 min read",
    thumbnail: "/blogs/new-portfolio/thumbnail.png",
    content: `Most people think a portfolio website should either feature high-end 3D designs and moving components, or the polar opposite: just a plain, barebones HTML file.

Before analyzing one's profile, I often see developers deploying portfolios crafted like a full macOS or Windows operating system theme.

However, in reality, it doesn't take all that over-engineering.

> Simplicity is the ultimate sophistication. - Leonardo da Vinci

## What Is It Really?

Your portfolio website is a direct reflection of what you do and how you do it.

For example, if you are a frontend-heavy developer, your website should demonstrate:

- Optimization and performance
- Refined design taste
- Good design sense and typography

Or if you are a backend developer, your website might feature blogs and case studies on:

- System design
- Database optimization
- Caching strategies
- Backend engineering architecture

Moreover, it demonstrates your expertise in building high-throughput systems.

---

Ultimately, it is a living reflection of your work.

## The Initial Traction

Here is the analytics breakdown of this website in the first week of launch:

![Website Analytics for First Week](/blogs/portfolio/analytics.png)

btw Thx everyone

Making your portfolio a success:

### 1. Provide Value Through Your Website

This is a crucial point to cover. In this age of AI, fewer people are writing authentic content. Most of the web is turning into AI slop.

Your motive should be to provide so much value that your website becomes inherently shareable.

When your content is shareable:

- It catches more eyeballs
- It gets more attraction and traction
- It opens up far more opportunities

Because in the end, attention is the ultimate currency. Don't just dump your projects onto a page and make it look like a boring resume.

### 2. Show Stories, Not Only Projects

Most developers create a project, dump a GitHub link on their page, and pick a random screenshot.

That is the wrong approach.

Treat your project like a product. Don't just leave it on GitHub where no one is going to inspect your code repository blindly.

For example, if you are building a component library, ask yourself these questions:

- What specific problem did you solve?
- What uniqueness does it bring to the table?
- What real impact did it have? (Use concrete numbers and analytics)

Package it into a compelling story. In order to attract opportunities, you have to make your work appealing and present it beautifully. 

Even if you built clone projects, they can still carry your unique engineering perspective.

### 3. Avoid 2015 Designs

Put dedicated time into refining these design fundamentals:

1. Spacing
2. Typography and Font Hierarchy
3. Whitespaces
4. Modern Design Principles

The more great design you consume, the better your taste becomes. Surround yourself with great designers and inspirational work.

Once you have a strong design eye and your portfolio looks aesthetic and hireable, your conversion rate skyrockets.

You have a much higher chance of people reaching out to you.

### 4. Make It Interactive & Memorable

Why should your website be interactive?

Because subtle, tasteful micro-interactions leave a lasting impression.

For example, hovering over your social links showing a smooth tooltip with the platform name elevates the user experience significantly.

A big warning: Don't overdo motion by blindly pasting component library animations (like Aceternity UI or Magic UI) everywhere.

Stuffed animations look chaotic. You don't need your website to be a showcase of library components.

Additionally, make your website memorable. 

For instance, [Ram's website](https://ramx.in) features a subtle moving doggo. 

Add a small, unique detail that connects visitors to your personality.

### 5. Position Yourself Correctly

Think of it this way: Just as you tailor your resume for specific roles, you need to tailor your portfolio website for your target domain.

Avoid generic, vague terms like "Frontend Dev" or "Backend Developer".

When a recruiter or hiring manager lands on your site, the first thing that needs to click in their mind is: 

*What is this person exceptionally good at?*

Compare:

\`Frontend Dev\` vs \`Client-Side Engineer & Interfaces Specialist\`

Which one looks more compelling and expert-level? 

Yes, The right side!

Position yourself as an expert in your niche. 

If you are a Backend Engineer or Full-Stack Developer, write about:

- Why system design matters
- How to optimize your frontend and backend performance
- How to deploy and scale production applications

This is called niching down. 

Position yourself as the exact person for the job.

At the end of the day, everyone wants someone who can solve their specific problems.

> It's not just who you are, but what you can do for them.

### 6. Treat It Like a Product

If you don't treat your portfolio like a product, you won't polish it like one.

Why should your portfolio feel like a SaaS or product? Because products are designed around user experience, clarity, and delivering immediate value.

### 7. Be One Click Away


You should be approachable with a single click.

Don't make the recruiter wait or click on some email address for them to draft an email.

## Conclusion

It's providing, value, story-telling, and positioning.

Treat your portfolio as a living product - polish your typography, 
package your projects into compelling case studies, 
add subtle micro-interactions, 
and make reaching out completely frictionless.

Focus on providing genuine value over noise, 
and your portfolio will naturally start opening doors, 
attracting visitors, and convincing hiring managers.

Build something remarkable!

> Thank you for reading 💖
`,
  },
  {
    title: "Understanding Network Devices",
    slug: "understanding-network-devices",
    subtitle: "Comprehensive Guide to Different Types of Network Devices",
    description: "Connecting to the outside of the world through the Internet is not that simple as it looks like. It involves an underlying process, that every device has to go through.",
    date: "2026-08-01",
    url: "https://hashnode.com/@theadroitdev",
    readTime: "4 min read",
    thumbnail: "/blogs/networking-devices/thumbnail.png",
    content: `Connecting to the outside of the world through the Internet is not that simple as it looks like.

It involves an underlying process, that every device has to go through.

## What is Modem 

and how it connects your network to the Internet

The Modem short for **(Modulator-Demodulator)** is your network’s gateway to the outside world.

### Modem → The Translator

It takes the responsibility of bridging your private network (eg: home/office) to the ISP(Internet Service Provider)

Your ISP sends signals over cable or (fiber, DSL).

The Modem translates these signals for you into digital data which the network can understand.

![Modem Translator](/blogs/networking-devices/diagram1.png)

For Example:

*   Cloud servers also connect via **enterprise-grade modems or ISP gateways**
*   Network outages often start **at the modem or upstream ISP**

## What is Router and how it redirects traffic

A Router connects different networks together, especially your local network which is LAN to the public network (WAN).

### Router → The Traffic Police

Router decides where the traffic should go.

For Example:

It looks at the IP address of every packet and decides whether it stays inside your home or needs to go out of the internet.

It assigns private IPs (using DHCP) and translates private IPs to public IPs(NAT)

### Modem Vs Router

| Modem | Router |
| --- | --- |
| Connects your private network to your ISP | Redirects the network Traffic |
| One Public IPs | Multiple IPs |
| Talks to internet | Talks to devices |


## Switch Vs Hub. How local networks actually work?

![Difference Between a Switch and a Hub](/blogs/networking-devices/diagram2.png)

### Managing the local crowd

These devices connect multiple gadgets (laptops, printers, TVs) within the same local network

*   **Hub (The Megaphone):** A "dumb" device. When it receives data, it broadcasts it to **every** connected port. This is inefficient and causes "collisions".
*   **Switch (The Intelligent Switchboard):** A "smart" device. It learns the unique **MAC address** of every connected device and sends data **only** to the specific recipient.
*   **Real-World Use:** Hubs are largely obsolete; switches are the standard for modern wired networks.

## What is Firewall and why security lives here?

A **Firewall** is a protective barrier that monitors and filters all incoming and outgoing traffic.

![Types of Network Firewall](/blogs/networking-devices/diagram3.png)

### Firewall: The Security Gate

It stands at the entrance of your network with a "guest list" (security rules). 

If a data packet isn't on the list or looks suspicious, the guard blocks it.

It prevents hackers, malicious and unauthorized traffic from entering your private network

### Where it sits

*   Between router and internal network
*   Around servers in production

## What is Load Balancers? 

### and why scalable systems need it?

If one server is overwhelmed with thousands of requests, 

the load balancer directs new "cars" (traffic) to other available servers.

![Load Balancer](/blogs/networking-devices/diagram4.png)

### Load Balancer: The Toll Booth Director

Distributing incoming requests across a pool of servers to ensure high availability and prevent any single point of failure

## Real-World Setup: How They Work Together

1.  **Internet** flows into the **Modem**.
2.  The **Modem** hands data to the **Firewall** (to filter out attacks).
3.  The **Firewall** sends safe data to the **Router**.
4.  The **Router** passes data to a **Load Balancer** (in a data center) or a **Switch** (in an office).
5.  The **Switch** delivers the data to the final **Server** or **PC**.



**Backend Connection:** For software engineers, these aren't just boxes.

A **Firewall** is where you configure "Security Groups" in AWS; a **Load Balancer** 

is your Nginx or AWS ELB; and a **Router** is what handles your VPC peering and subnet routing

![Backend Connection](/blogs/networking-devices/diagram5.png)

Thank you for reading 💖
`,
  },
];
