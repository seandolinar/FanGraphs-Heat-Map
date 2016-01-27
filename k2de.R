library(ggplot2)
library(scales)
library(sitools)
library(extrafont)
library(spatstat)
library(dplyr)
library(MASS)
library(jsonlite)

setwd('~/fg/projects/fg_august_sliders/data/')
data.one <- read.csv('518516_sliders.csv')

data.one <- filter(data.one, outcome=='C')
x_axis <- c(-4,4)
y_axis <- c(-1,6)
X <- kde2d(data.one$px, data.one$pz, n=900, h = rep(.5, 2), lims=c(x_axis, y_axis))
range(X$z)
hist(log(X$z))

out$x_axis <- x_axis
out$y_axis <- y_axis
out$xy <- data.one[,c('px','pz')]
out$den <- X$z
write(x=toJSON(out), file='~/seandolinar_com/htdocs/fg-heatmaps/data.json')
